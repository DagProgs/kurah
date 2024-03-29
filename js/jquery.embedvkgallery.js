(function ($) {
    var vkApi = 'https://api.vk.com/method/photos.get'
    var proxyApi = 'https://7k0cvr7eaj.execute-api.us-east-1.amazonaws.com/dev/embed-vk-gallery'
    // по умолчанию используем прокси (если нет access_token)
    var url = proxyApi
    var access_token = ''

    $(function () {
        var nps = 'EmbedVkGallery';
        $[nps] = {
            full_image_size: 'x',
            width: 100,
            margin: 4,
            static: 0,
            height: 0,
            rev: 1,
            shuffle: 0,
            limit: 0,
            link: '',
            link_mapper: function (el) {
                return [
                    el.href,
                    '<a href="' + el.href + '">' + el.title + '</a>'
                ]
            }
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function embedVkGalleryCompareRandom(a, b) {
            return Math.random() - 0.5;
        }

        $.fn[nps] = function (opts) {
            var self = this
            opts = opts || {};
            opts = (typeof (opts) !== 'object') ? { link: opts } : opts;
            var localOpts = $.extend({}, $[nps], opts),
                json;
            function showAlbum() {
                var $this = $(this),
                    $array_for_promises = [],
                    $loader_block,
                    $loader_blinding_block,
                    gallerySetName = 'gallerySetName' + +new Date(),
                    meta_opts = $.extend({}, localOpts, $this.data()),
                    res = /(-?\d+)_(\d+)/g.exec(meta_opts.link);
                if (!res || res.length < 3) { return; }

                $loader_blinding_block = $('<span/>', { text: '...' });
                $loader_block = $('<div/>', {
                    text: 'Загрузка фотографий, пожалуйста подождите ',
                    style: 'text-align: center; padding: 20px 20px;',
                    'class': 'jquery-embedvkgallery-loader-block'
                });
                $loader_block.append($loader_blinding_block);
                $this.append($loader_block);
                setInterval(function () {
                    $loader_blinding_block.fadeOut(500).fadeIn(500);
                }, 1000);

                var query = url + '?&photo_sizes=1&extended=1&album_id=' + res[2]
                    + '&access_token=' + access_token
                    + '&count=1000'
                    + '&owner_id=' + res[1]
                    + '&rev=' + meta_opts.rev
                    + '&v=5.131&callback=?';
                if (meta_opts.width < 0) { return; }
                meta_opts.height = meta_opts.width - (meta_opts.width / 2 ^ 0);

                function resize($img) {
                    var $div = $img.closest('div'),
                        d_h = $div.height(),
                        d_w = $div.width(),
                        i_h = $img.height(),
                        i_w = $img.width();
                
                    var max_width = Math.min(i_w, d_w);
                
                    if (i_w > max_width) {
                        var ratio = max_width / i_w;
                        $img.css({
                            width: max_width + 'px',
                            height: i_h * ratio + 'px'
                        });
                    }
                
                    return $img;
                }

                function getCountRows(count, width, parentWidth) {
                    var min = parentWidth / width ^ 0,
                        result = [];
                    if (count <= min) {
                        return [count];
                    } else {
                        while (count > 0) {
                            if ((count - min) > min) {
                                result[result.length] = min;
                            } else {
                                result[result.length] = count / 2 ^ 0;
                                result[result.length] = count - result[result.length - 1];
                                count = 0;
                            }
                            count -= result[result.length - 1];
                        }
                    }
                    for (var i = 0; i < result.length; i++) {
                        if (i % 2 === 0) {
                            if (i <= (result.length - 2)) {
                                if (result[i] > 3 && result[i + 1] > 3) {
                                    var max = (result[i] / 3 ^ 0) < (result[i + 1] / 3 ^ 0) ?
                                        result[i] / 3 ^ 0 : result[i + 1] / 3 ^ 0,
                                        plusOrMinus = Math.random() < 0.5 ? -1 : 1,
                                        a = getRandomInt(1, max) * plusOrMinus;
                                    result[i] += a;
                                    result[i + 1] -= a;
                                }
                            }
                        }
                    }
                    return result;
                }

                function expanding($row) {
                    var $divs = $('div', $row),
                        totalWidth = $divs.length * meta_opts.margin,
                        diff,
                        newWidth,
                        newHeight;
                    
                    $divs.each(function () {
                        totalWidth += $(this).data('newWidth');
                    });
                
                    totalWidth = totalWidth ^ 0;
                
                    $divs.each(function () {
                        $(this).css({
                            width: '100vw',
                            height: 'auto',
                            margin: meta_opts.margin + 'px 0',
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        });
                
                        var $def = $.Deferred();
                        $array_for_promises.push($def);
                
                        var $a = $('<a>', {
                            href: $(this).data('maxSrc'),
                            rel: gallerySetName,
                            'class': 'embedvkgallery_link',
                            'data-lightbox': gallerySetName,
                            title: $(this).data('text')
                        });
                
                        var $img = $('<img>', {
                            src: $(this).data('src'),
                            'class': 'embedvkgallery_img'
                        })
                        .css({ margin: 0, display: 'none' })
                        .one('load', function () {
                            resize($(this));
                            $def.resolve();
                        })
                        .on('error', function () {
                            $def.resolve();
                        });
                
                        $a.append($img).appendTo($(this));

                        $('<p>', {
                            text: $(this).data('text'),
                            style: 'background-color: #f1f1f1; padding: 10px 15px;'
                        }).appendTo($(this));
                    });
                
                    return $row;
                }

                function addSlider($elem) {
                    if ($.fn.slimbox) {
                        $('a', $elem).slimbox({}, meta_opts.link_mapper);
                    } else if ($.fn.swipebox) {
                        $('a.embedvkgallery_link', $elem).swipebox({}, meta_opts.link_mapper);
                    }
                }

                function renderAlbumList(data) {
                    if (data.response && data.response.count > 0) {
                        if (+meta_opts.shuffle) {
                            data.response.items.sort(embedVkGalleryCompareRandom);
                        }

                        if (meta_opts.limit && +meta_opts.limit && meta_opts.limit < data.response.count) {
                            data.response.items.length = meta_opts.limit;
                            data.response.count = data.response.items.length;
                        }
                        json = data;
                        var arr = getCountRows(data.response.count, meta_opts.width, $this.width()),
                            sizes = 2,
                            item = 0;
                        for (var i = 0; i < arr.length; i++) {
                            var $row = $('<div>');
                            for (var j = 0; j < arr[i]; j++) {
                                var c_height = data.response.items[item].sizes[sizes].height,
                                    c_width = data.response.items[item].sizes[sizes].width,
                                    newWidth = c_width * meta_opts.height / c_height ^ 0,
                                    maxSrc,
                                    grepResults;

                                grepResults = $.grep(data.response.items[item].sizes, function (size) {
                                    return size.type == localOpts.full_image_size;
                                });
                                if (!grepResults || !grepResults.length) {
                                    grepResults = $.grep(data.response.items[item].sizes, function (size) {
                                        return size.type == 'm';
                                    });
                                    if (!grepResults || !grepResults.length) {
                                        grepResults = $.grep(data.response.items[item].sizes, function (size) {
                                            return size.type == 's';
                                        });
                                    }
                                }
                                if (!grepResults || !grepResults.length) {
                                    continue;
                                }
                                maxSrc = grepResults[0].url;

                                $('<div>').data({
                                    newHeight: meta_opts.height,
                                    newWidth: newWidth,
                                    src: data.response.items[item].sizes[sizes].url,
                                    text: data.response.items[item].text,
                                    maxSrc: maxSrc
                                }).appendTo($row);
                                item++;
                            }
                            expanding($row).appendTo($this);
                            addSlider($this);
                        }
                        $.when.apply(null, $array_for_promises).done(function () {
                            $loader_block.hide('slow');
                            $this.find('.embedvkgallery_img').fadeIn('slow');
                        });
                    } else {
                        $this.text('Album not found');
                    }
                }

                function filterCollection(data) {
                    if (data.response) {
                        $this.text('Album not found');
                        return false;
                    }
                }

                if (!json) {
                    $.getJSON(query, renderAlbumList)
                        .fail(function () {
                            $loader_block.html('Ошибка загрузки фотографий :(');
                        });
                } else {
                    renderAlbumList(json);
                }
            }

            $.get('/access_token.txt').done(function (token) {
                access_token = token
                url = vkApi
            }).always(function () {
                return self.each(showAlbum);
            })
        };
    });
})(jQuery);
