/**
 * $Id: colorpicker.js 203 2011-06-01 19:02:19Z happy_noodle_boy $
 * @package   	JCE
 * @copyright 	Copyright (c) 2009-2012 Ryan Demmer. All rights reserved.
 * @copyright 	Copyright (c) 2004-2008, Moxiecode Systems AB, All rights reserved.
 * @license   	GNU/GPL 2 or later
 * This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */
(function($) {
    $.widget("ui.colorpicker", {

        instance : null,

        options : {
            color : '#FFFFFF',
            dialog: true,
            detail 	: 50,
            speed 	: 200,
            template_colors : '',
            custom_colors 	: '',
            forcedHighContrastMode : false,
            labels : {
                picker_tab 		: 'Picker',
                title			: 'Color Picker',
                palette_tab 	: 'Palette',
                palette			: 'Web Colors',
                named_tab 		: 'Named',
                named			: 'Named Colors',
                template_tab 	: 'Template',
                template		: 'Template Colors',
                custom 			: 'Custom Colors',
                color 			: 'Color',
                apply 			: 'Apply',
                name 			: 'Name'
            },
            insert 	: $.noop,
            close	: $.noop
        },
        _strhex : "0123456789abcdef",
        /**
         * Array of Web Color values
         */
        _colors : [
        "#000000","#000033","#000066","#000099","#0000cc","#0000ff","#330000","#330033",
        "#330066","#330099","#3300cc","#3300ff","#660000","#660033","#660066","#660099",
        "#6600cc","#6600ff","#990000","#990033","#990066","#990099","#9900cc","#9900ff",
        "#cc0000","#cc0033","#cc0066","#cc0099","#cc00cc","#cc00ff","#ff0000","#ff0033",
        "#ff0066","#ff0099","#ff00cc","#ff00ff","#003300","#003333","#003366","#003399",
        "#0033cc","#0033ff","#333300","#333333","#333366","#333399","#3333cc","#3333ff",
        "#663300","#663333","#663366","#663399","#6633cc","#6633ff","#993300","#993333",
        "#993366","#993399","#9933cc","#9933ff","#cc3300","#cc3333","#cc3366","#cc3399",
        "#cc33cc","#cc33ff","#ff3300","#ff3333","#ff3366","#ff3399","#ff33cc","#ff33ff",
        "#006600","#006633","#006666","#006699","#0066cc","#0066ff","#336600","#336633",
        "#336666","#336699","#3366cc","#3366ff","#666600","#666633","#666666","#666699",
        "#6666cc","#6666ff","#996600","#996633","#996666","#996699","#9966cc","#9966ff",
        "#cc6600","#cc6633","#cc6666","#cc6699","#cc66cc","#cc66ff","#ff6600","#ff6633",
        "#ff6666","#ff6699","#ff66cc","#ff66ff","#009900","#009933","#009966","#009999",
        "#0099cc","#0099ff","#339900","#339933","#339966","#339999","#3399cc","#3399ff",
        "#669900","#669933","#669966","#669999","#6699cc","#6699ff","#999900","#999933",
        "#999966","#999999","#9999cc","#9999ff","#cc9900","#cc9933","#cc9966","#cc9999",
        "#cc99cc","#cc99ff","#ff9900","#ff9933","#ff9966","#ff9999","#ff99cc","#ff99ff",
        "#00cc00","#00cc33","#00cc66","#00cc99","#00cccc","#00ccff","#33cc00","#33cc33",
        "#33cc66","#33cc99","#33cccc","#33ccff","#66cc00","#66cc33","#66cc66","#66cc99",
        "#66cccc","#66ccff","#99cc00","#99cc33","#99cc66","#99cc99","#99cccc","#99ccff",
        "#cccc00","#cccc33","#cccc66","#cccc99","#cccccc","#ccccff","#ffcc00","#ffcc33",
        "#ffcc66","#ffcc99","#ffcccc","#ffccff","#00ff00","#00ff33","#00ff66","#00ff99",
        "#00ffcc","#00ffff","#33ff00","#33ff33","#33ff66","#33ff99","#33ffcc","#33ffff",
        "#66ff00","#66ff33","#66ff66","#66ff99","#66ffcc","#66ffff","#99ff00","#99ff33",
        "#99ff66","#99ff99","#99ffcc","#99ffff","#ccff00","#ccff33","#ccff66","#ccff99",
        "#ccffcc","#ccffff","#ffff00","#ffff33","#ffff66","#ffff99","#ffffcc","#ffffff"
        ],
        /**
         * Array of named color values
         */
        _named : {
            '#F0F8FF':'AliceBlue',
            '#FAEBD7':'AntiqueWhite',
            '#00FFFF':'Aqua',
            '#7FFFD4':'Aquamarine',
            '#F0FFFF':'Azure',
            '#F5F5DC':'Beige',
            '#FFE4C4':'Bisque',
            '#000000':'Black',
            '#FFEBCD':'BlanchedAlmond',
            '#0000FF':'Blue',
            '#8A2BE2':'BlueViolet',
            '#A52A2A':'Brown',
            '#DEB887':'BurlyWood',
            '#5F9EA0':'CadetBlue',
            '#7FFF00':'Chartreuse',
            '#D2691E':'Chocolate',
            '#FF7F50':'Coral',
            '#6495ED':'CornflowerBlue',
            '#FFF8DC':'Cornsilk',
            '#DC143C':'Crimson',
            '#00FFFF':'Cyan',
            '#00008B':'DarkBlue',
            '#008B8B':'DarkCyan',
            '#B8860B':'DarkGoldenRod',
            '#A9A9A9':'DarkGray',
            '#006400':'DarkGreen',
            '#BDB76B':'DarkKhaki',
            '#8B008B':'DarkMagenta',
            '#556B2F':'DarkOliveGreen',
            '#FF8C00':'Darkorange',
            '#9932CC':'DarkOrchid',
            '#8B0000':'DarkRed',
            '#E9967A':'DarkSalmon',
            '#8FBC8F':'DarkSeaGreen',
            '#483D8B':'DarkSlateBlue',
            '#2F4F4F':'DarkSlateGrey',
            '#00CED1':'DarkTurquoise',
            '#9400D3':'DarkViolet',
            '#FF1493':'DeepPink',
            '#00BFFF':'DeepSkyBlue',
            '#696969':'DimGrey',
            '#1E90FF':'DodgerBlue',
            '#B22222':'FireBrick',
            '#FFFAF0':'FloralWhite',
            '#228B22':'ForestGreen',
            '#FF00FF':'Fuchsia',
            '#DCDCDC':'Gainsboro',
            '#F8F8FF':'GhostWhite',
            '#FFD700':'Gold',
            '#DAA520':'GoldenRod',
            '#808080':'Gray',
            '#808080':'Grey',
            '#008000':'Green',
            '#ADFF2F':'GreenYellow',
            '#F0FFF0':'HoneyDew',
            '#FF69B4':'HotPink',
            '#CD5C5C':'IndianRed',
            '#4B0082':'Indigo',
            '#FFFFF0':'Ivory',
            '#F0E68C':'Khaki',
            '#E6E6FA':'Lavender',
            '#FFF0F5':'LavenderBlush',
            '#7CFC00':'LawnGreen',
            '#FFFACD':'LemonChiffon',
            '#ADD8E6':'LightBlue',
            '#F08080':'LightCoral',
            '#E0FFFF':'LightCyan',
            '#FAFAD2':'LightGoldenRodYellow',
            '#D3D3D3':'LightGray',
            '#D3D3D3':'LightGrey',
            '#90EE90':'LightGreen',
            '#FFB6C1':'LightPink',
            '#FFA07A':'LightSalmon',
            '#20B2AA':'LightSeaGreen',
            '#87CEFA':'LightSkyBlue',
            '#778899':'LightSlateGray',
            '#778899':'LightSlateGrey',
            '#B0C4DE':'LightSteelBlue',
            '#FFFFE0':'LightYellow',
            '#00FF00':'Lime',
            '#32CD32':'LimeGreen',
            '#FAF0E6':'Linen',
            '#FF00FF':'Magenta',
            '#800000':'Maroon',
            '#66CDAA':'MediumAquaMarine',
            '#0000CD':'MediumBlue',
            '#BA55D3':'MediumOrchid',
            '#9370D8':'MediumPurple',
            '#3CB371':'MediumSeaGreen',
            '#7B68EE':'MediumSlateBlue',
            '#00FA9A':'MediumSpringGreen',
            '#48D1CC':'MediumTurquoise',
            '#C71585':'MediumVioletRed',
            '#191970':'MidnightBlue',
            '#F5FFFA':'MintCream',
            '#FFE4E1':'MistyRose',
            '#FFE4B5':'Moccasin',
            '#FFDEAD':'NavajoWhite',
            '#000080':'Navy',
            '#FDF5E6':'OldLace',
            '#808000':'Olive',
            '#6B8E23':'OliveDrab',
            '#FFA500':'Orange',
            '#FF4500':'OrangeRed',
            '#DA70D6':'Orchid',
            '#EEE8AA':'PaleGoldenRod',
            '#98FB98':'PaleGreen',
            '#AFEEEE':'PaleTurquoise',
            '#D87093':'PaleVioletRed',
            '#FFEFD5':'PapayaWhip',
            '#FFDAB9':'PeachPuff',
            '#CD853F':'Peru',
            '#FFC0CB':'Pink',
            '#DDA0DD':'Plum',
            '#B0E0E6':'PowderBlue',
            '#800080':'Purple',
            '#FF0000':'Red',
            '#BC8F8F':'RosyBrown',
            '#4169E1':'RoyalBlue',
            '#8B4513':'SaddleBrown',
            '#FA8072':'Salmon',
            '#F4A460':'SandyBrown',
            '#2E8B57':'SeaGreen',
            '#FFF5EE':'SeaShell',
            '#A0522D':'Sienna',
            '#C0C0C0':'Silver',
            '#87CEEB':'SkyBlue',
            '#6A5ACD':'SlateBlue',
            '#708090':'SlateGray',
            '#708090':'SlateGrey',
            '#FFFAFA':'Snow',
            '#00FF7F':'SpringGreen',
            '#4682B4':'SteelBlue',
            '#D2B48C':'Tan',
            '#008080':'Teal',
            '#D8BFD8':'Thistle',
            '#FF6347':'Tomato',
            '#40E0D0':'Turquoise',
            '#EE82EE':'Violet',
            '#F5DEB3':'Wheat',
            '#FFFFFF':'White',
            '#F5F5F5':'WhiteSmoke',
            '#FFFF00':'Yellow',
            '#9ACD32':'YellowGreen'
        },

        /**
         * Initialise the plugin
         * @param {Object} trigger Trigger element that launches the colorpicker
         * @param {Object} input Input element that contains the hex value
         * @param {Object} options Options object
         */
        _init : function() {
            var self = this;

            if (this.options.dialog) {
                $('<span class="colorpicker_widget"></span>').insertAfter(this.element).css('background-color', $(this.element).val()).click( function(event) {
                    // is it open?
                    if ($('#colorpicker').get(0)) {
                        if ($('#colorpicker').dialog('isOpen')) {
                            return self._close();
                        } else {
                            $('#colorpicker').dialog('open', event);
                        }
                    } else {
                        self._open(event, true);
                    }
                });

                // update widget
                $(this.element).change( function() {
                    $(this).next('span.colorpicker_widget').css('background-color', $(this).val());
                });

            } else {
                var color = $(this.element).val();

                self._createTabs();
                // update color picker preview
                $('#colorpicker_preview_color').css('background-color', color);
                $('#colorpicker_color').val(color);

                // set wheel colour
                if (self._wheel) {
                    self._wheel.setColor(color);
                }
            }
        },

        /**
         * Open the colorpicker
         * @param {Object} el Trigger element
         */
        _open : function(event, init) {
            var self = this, h = '', o = this.options, widget = event.target;

            h += '<div id="colorpicker_tabs">';
            h += '<ul>';
            h += '<li><a href="#colorpicker_picker" aria-controls="colorpicker_picker">{#picker}</a></li>';
            h += '<li><a href="#colorpicker_web" aria-controls="colorpicker_web">{#palette}</a></li>';
            h += '<li><a href="#colorpicker_named" aria-controls="colorpicker_named">{#named}</a></li>';

            // add template / custom colours
            if (o.template_colors || o.custom_colors) {
                h += '<li><a href="#colorpicker_template" aria-controls="colorpicker_template">{#template}</a></li>';
            }

            h += '</ul>';
            h += '<div id="colorpicker_picker" data-type="picker"></div>';
            h += '<div id="colorpicker_web" data-type="web"></div>';
            h += '<div id="colorpicker_named" data-type="named"></div>';

            // add template / custom colours
            if (o.template_colors || o.custom_colors) {
                h += '<div id="colorpicker_template" data-type="template"></div>';
            }

            h += '</div>';

            var pos = $(widget).offset();

            $('<div id="colorpicker"></div>').html(h).dialog({
                width : 320,
                height: 385,
                title: o.labels.title,
                buttons : [{
                    text : o.labels.apply,
                    click : function() {
                        self._insert();
                    }

                }
                ],
                autoOpen : false,
                open : function(event, ui) {
                    var color = $(self.element).val() || '#FFFFFF';

                    // remove colour value if placeholder
                    if ($(self.element).hasClass('placeholder')) {
                        color = '';
                    }

                    if (/rgb/.test(color)) {
                        color = self._rgbToHex(color);
                    }

                    $(this).dialog('widget').css({
                        left : pos.left + $(widget).outerWidth() + 2 + 'px',
                        top : pos.top + 'px'
                    });

                    // set wheel colour
                    if (self._wheel) {
                        self._wheel.setColor(color);
                    }

                    // tabs already created
                    if ($('#colorpicker_tabs').is('.ui-tabs')) {
                        return;
                    }

                    // translate labels
                    $(this).html( function(i, h) {
                        return h.replace(/\{#([a-z]+)\}/gi, function(a, b) {
                            return o.labels[b];
                        });

                    });

                    // create tabs
                    self._createTabs();

                    $('#colorpicker').append(
                    '<div id="colorpicker_preview">' +
                    '	<div id="colorpicker_preview_text">' +
                    '		<input type="text" id="colorpicker_color" size="8" maxlength="8" value="' + color + '" class="ui-corner-all" aria-required="true" />' +
                    '	</div>' +
                    '	<div id="colorpicker_preview_color" class="ui-widget-content ui-corner-all"></div>' +
                    '</div>'
                    );

                    $('#colorpicker_preview_color').css('background-color', color);

                    $(this).dialog('widget').find('button:ui-button').addClass('ui-button-text-icon-primary').prepend('<span class="i-button-icon-primary ui-icon ui-icon-check"></span>');
                }

            }).dialog('open');
        },

        _createTabs : function() {
            var self = this;
            $('#colorpicker_tabs', '#colorpicker').tabs({
                show: function(event, ui) {
                    self['_create' + $(ui.panel).data('type')].call(self, $(ui.panel));
                }

            });

            // create initial picker
            self._createpicker($('#colorpicker_picker', '#colorpicker_tabs'));
        },

        /**
         * Close colorpicker on 'blur'
         * @param {Object} e
         */
        _blur : function(e) {
            var t = this;
            if (e) {
                if (e.target == this.picker || e.target == this.picker.colorpicker) {
                    return false;
                }
                var matched = false;

                $(this.picker.colorpicker).find('*').each( function() {
                    if (this == e.target) {
                        matched = true;
                        return false;
                    }
                });

                if (!matched) {
                    t.close();
                }
            }
        },

        /**
         * Close the colorpicker
         */
        _close : function() {
            this._trigger('close', null);

            $('#colorpicker').dialog('close');
        },

        /**
         * Insert selected colorpicker value
         */
        _insert : function() {
            var color = $('#colorpicker_color').val();

            this._trigger('insert', null, color);

            if (color) {
                $(this.element).val(color).removeClass('placeholder').next('span.colorpicker_widget').css('background-color', color);
            }

            this._close();
        },

        /**
         * Convert RGB color value to Hex value
         * @author Moxiecode
         * @copyright Copyright (C) 2004-2009, Moxiecode Systems AB, All rights reserved.
         * @param {String} c RGB Color
         */
        _rgbToHex : function(c) {
            var re = new RegExp("rgb\\s*\\(\\s*([0-9]+).*,\\s*([0-9]+).*,\\s*([0-9]+).*\\)", "gi");

            if (!c) {
                return c;
            }

            var rgb = c.replace(re, "$1,$2,$3").split(',');
            if (rgb.length == 3) {
                r = parseInt(rgb[0]).toString(16);
                g = parseInt(rgb[1]).toString(16);
                b = parseInt(rgb[2]).toString(16);

                r = r.length == 1 ? '0' + r : r;
                g = g.length == 1 ? '0' + g : g;
                b = b.length == 1 ? '0' + b : b;

                return "#" + r + g + b;
            }

            return c;
        },

        /**
         * Convert Hex color value to RGB value
         * @author Moxiecode
         * @copyright Copyright (C) 2004-2009, Moxiecode Systems AB, All rights reserved.
         * @param {String} c Hex Color
         */
        _hexToRGB : function(c) {
            if (c.indexOf('#') != -1) {
                c = c.replace(new RegExp('[^0-9A-F]', 'gi'), '');

                r = parseInt(c.substring(0, 2), 16);
                g = parseInt(c.substring(2, 4), 16);
                b = parseInt(c.substring(4, 6), 16);

                return {
                    r : r,
                    g : g,
                    b : b
                };
            }

            return null;
        },

        /**
         * Generate Picker
         * @param {Object} parent DIV element to insert picker code into
         */
        _createpicker : function(parent) {
            var self = this;

            if ($(parent).hasClass('colorpicker_generated')) {
                return;
            }

            self._wheel = $.farbtastic(parent, $('#colorpicker_color').val(), function(color) {
                self._showColor(color);
            });

            $(parent).addClass('colorwheel colorpicker_generated');
        },

        /**
         * Generate Web Color blocks
         * @param {Object} parent DIV element to append code to
         */
        _createweb : function(parent) {
            var self = this, h = '';

            if ($(parent).hasClass('colorpicker_generated')) {
                return;
            }

            h += '<div role="listbox" aria-labelledby="colorpicker_web" tabindex="0">';
            h += '<ul>';

            $.each(this._colors, function(i, v) {
                h += '<li style="background-color:' + v + '"><span class="colorpicker_webblock" role="option" aria-labelledby="web_colors_' + i + '" title="' + v + '"></span></li>';
                if (self.options.forcedHighContrastMode) {
                    h += '<canvas class="mceColorSwatch" data-color="' + v + '"></canvas>';
                }
                h += '<span class="mceVoiceLabel" id="web_colors_' + i + '">' + v.toUpperCase() + '</span>';

                if ((i + 1) % 18 == 0) {
                    h += '</ul><ul>';
                }
            });

            h += '</div>';

            $(parent).append(h).append('<br style="clear:both;" />').addClass('colorpicker_generated');

            $('span.colorpicker_webblock', parent).click( function() {
                self._insert();
            }).mouseover( function() {
                self._showColor($(this).attr('title'));
            });

            this._paintCanvas(parent);
        },

        /**
         * Generate Named Color blocks
         * @param {Object} parent DIV element to append code to
         */
        _createnamed : function(parent) {
            var self = this, h = '', i = 0;

            if ($(parent).hasClass('colorpicker_generated')) {
                return;
            }

            h += '<div role="listbox" aria-labelledby="colorpicker_named" tabindex="0">';
            h += '<ul>';

            $.each(this._named, function(k, v) {
                h += '<li style="background-color:' + k + '"><span class="colorpicker_namedblock" aria-labelledby="named_colors_' + k + '" title="' + v + '"></span></li>';
                if (self.options.forcedHighContrastMode) {
                    h += '<canvas class="mceColorSwatch" data-color="' + v + '"></canvas>';
                }
                h += '<span class="mceVoiceLabel" id="named_colors_' + k + '">' + v.toUpperCase() + '</span>';

                if ((i + 1) % 18 == 0) {
                    h += '</ul><ul>';
                }
                i++;
            });

            h += '</div>';

            $(parent).append(h).append('<br style="clear:both;" />').addClass('colorpicker_generated').append('<div id="colorpicker_colorname">' + this.options.labels.name + '</div>');

            $('span.colorpicker_namedblock', parent).click( function() {
                self._insert();
            }).mouseover( function() {
                self._showColor($(this).parent('li').css('background-color'), $(this).attr('title'));
            });

            this._paintCanvas(parent);
        },

        /**
         * Generate Template Color blocks
         * @param {Object} el DIV element to append code to
         */
        _createtemplate : function(parent) {
            var self = this, h = '';

            if ($(parent).hasClass('colorpicker_generated')) {
                return;
            }

            if (this.options.template_colors) {
                $(parent).append('<p id="colorpicker_template_label">'+this.options.labels.template + '</p>');

                var templateColors = this.options.template_colors;

                if ($.type(this.options.template_colors) == 'string') {
                    templateColors = templateColors.split(',');
                }

                h += '<div role="listbox" aria-labelledby="colorpicker_template_label" tabindex="0">';
                h += '<ul>';

                $.each(templateColors, function(i, v) {
                    if (v.length == 4) {
                        v = v + v.substr(1);
                    }
                    h += '<li style="background-color:' + v + '"><span class="colorpicker_templateblock" aria-labelledby="template_colors_' + i + '" title="'+v+'"></span></li>';
                    if (self.options.forcedHighContrastMode) {
                        h += '<canvas class="mceColorSwatch" data-color="' + v + '"></canvas>';
                    }
                    h += '<span class="mceVoiceLabel" id="template_colors_' + i + '">' + v.toUpperCase() + '</span>';
                    if ((i + 1) % 18 == 0) {
                        h += '</ul><ul>';
                    }
                });

                h += '</div>';

                $(parent).append(h);
            }
            if (this.options.custom_colors) {
                var h = '';

                $(parent).append('<p id="colorpicker_custom_label">'+this.options.labels.custom + '</p>');

                var customColors = this.options.custom_colors.split(',');

                h += '<div role="listbox" aria-labelledby="colorpicker_custom_label" tabindex="0">';
                h += '<ul>';

                $.each(customColors, function(i, v) {
                    if (v.length == 4) {
                        v = v + v.replace('#', '');
                    }
                    h += '<li style="background-color:' + v + '"><span class="colorpicker_templateblock" aria-labelledby="custom_colors_' + i + '" title="'+v+'"></span></li>';
                    if (self.options.forcedHighContrastMode) {
                        h += '<canvas class="mceColorSwatch" data-color="' + v + '"></canvas>';
                    }
                    h += '<span class="mceVoiceLabel" style="display:none;" id="custom_colors_' + i + '">' + v.toUpperCase() + '</span>';
                    if ((i + 1) % 18 == 0) {
                        h += '</ul><ul>';
                    }
                });

                h += '</div>';

                $(parent).append(h);

                this._paintCanvas(parent);
            }

            $(parent).addClass('colorpicker_generated');

            $('span.colorpicker_templateblock', parent).click( function() {
                self._insert();
            }).mouseover( function() {
                self._showColor($(this).attr('title'));
            });

        },

        /**
         * Update name, color preview and color value
         * @param {Object} color Color hex value
         * @param {Object} name Color name
         */
        _showColor : function(color, name) {
            if (name) {
                $("#colorpicker_colorname").html(this.options.labels.name + ': ' + name);
            }

            if (/rgb/.test(color)) {
                color = this._rgbToHex(color);
            }

            $("#colorpicker_preview_color").css('background-color', color);
            $("#colorpicker_color").val(color.toLowerCase());
        },

        /**
         * Update color value and bcakground color preview
         * @param {Object} color Hex value
         */
        _changeFinalColor : function(color) {
            if (!/#/.test(color)) {
                color = this._rgbToHex(color);
            }

            $('#colorpicker_preview').css('background-color', color);
            $('#colorpicker_color').val(color);
        },

        _paintCanvas : function(el) {
            $('canvas.mceColorSwatch', el).each( function() {
                $canvas = $(this).get(0);

                if ($canvas.getContext && (context = $canvas.getContext("2d"))) {
                    context.fillStyle = $canvas.getAttribute('data-color');
                    context.fillRect(0, 0, 10, 10);
                }
            });

        },

        destroy : function() {
            $.Widget.prototype.destroy.apply(this, arguments);
        }

    });

    $.extend($.ui.colorpicker, {
        version : "@@version@@"
    });
})(jQuery);

/**
 * Farbtastic Color Picker 1.2
 * (c) 2008 Steven Wittens
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
(function($) {
    $.fn.farbtastic = function(callback) {
        $.farbtastic(this, callback);
        return this;
    };

    $.farbtastic = function(container, color, callback) {
        var container = $(container).get(0);
        return container.farbtastic || (container.farbtastic = new $._farbtastic(container, color, callback));
    };

    $._farbtastic = function(container, color, callback) {
        // Store farbtastic object
        var fb = this;

        fb.clr = color || '#000000';

        // Insert markup
        $(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
        var e = $('.farbtastic', container);
        fb.wheel = $('.wheel', container).get(0);
        // Dimensions
        fb.radius = 84;
        fb.square = 100;
        fb.width = 194;

        // Fix background PNGs in IE6
        if (!!window.ActiveXObject && !window.XMLHttpRequest) {
            $('*', e).each( function() {
                if (this.currentStyle.backgroundImage != 'none') {
                    var image = this.currentStyle.backgroundImage;
                    image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
                    $(this).css({
                        'backgroundImage': 'none',
                        'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
                    });
                }
            });

        }

        /**
         * Link to the given element(s) or callback.
         */
        fb.linkTo = function(callback) {
            // Unbind previous nodes
            if (typeof fb.callback == 'object') {
                $(fb.callback).unbind('keyup', fb.updateValue);
            }

            // Reset color
            fb.color = null;

            // Bind callback or elements
            if (typeof callback == 'function') {
                fb.callback = callback;
            } else if (typeof callback == 'object' || typeof callback == 'string') {
                fb.callback = $(callback);
                fb.callback.bind('keyup', fb.updateValue);
                if (fb.callback.get(0).value) {
                    fb.setColor(fb.callback.get(0).value);
                }
            }
            return this;
        };

        fb.updateValue = function(event) {
            if (this.value && this.value != fb.color) {
                fb.setColor(this.value);
            }
        };

        /**
         * Change color with HTML syntax #123456
         */
        fb.setColor = function(color) {
            var unpack = fb.unpack(color);
            if (fb.color != color && unpack) {
                fb.color = color;
                fb.rgb = unpack;
                fb.hsl = fb.RGBToHSL(fb.rgb);
                fb.updateDisplay();
            }
            return this;
        };

        /**
         * Change color with HSL triplet [0..1, 0..1, 0..1]
         */
        fb.setHSL = function(hsl) {
            fb.hsl = hsl;
            fb.rgb = fb.HSLToRGB(hsl);
            fb.color = fb.pack(fb.rgb);
            fb.updateDisplay();
            return this;
        };

        /////////////////////////////////////////////////////

        /**
         * Retrieve the coordinates of the given event relative to the center
         * of the widget.
         */
        fb.widgetCoords = function(event) {
            var x, y;
            var el = event.target || event.srcElement;
            var reference = fb.wheel;

            // Use absolute coordinates
            var pos = fb.absolutePosition(reference);
            x = (event.pageX || 0 * (event.clientX + $('html').get(0).scrollLeft)) - pos.x;
            y = (event.pageY || 0 * (event.clientY + $('html').get(0).scrollTop)) - pos.y;

            // Subtract distance to middle
            return {
                x: x - fb.width / 2,
                y: y - fb.width / 2
            };
        };

        /**
         * Mousedown handler
         */
        fb.mousedown = function(event) {
            // Capture mouse
            if (!document.dragging) {
                $(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
                document.dragging = true;
            }

            // Check which area is being dragged
            var pos = fb.widgetCoords(event);
            fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;

            // Process
            fb.mousemove(event);
            return false;
        };

        /**
         * Mousemove handler
         */
        fb.mousemove = function(event) {
            // Get coordinates relative to color picker center
            var pos = fb.widgetCoords(event);

            // Set new HSL parameters
            if (fb.circleDrag) {
                var hue = Math.atan2(pos.x, -pos.y) / 6.28;
                if (hue < 0) {
                    hue += 1;
                }
                fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
            } else {
                var sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + .5));
                var lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + .5));
                fb.setHSL([fb.hsl[0], sat, lum]);
            }
            return false;
        };

        /**
         * Mouseup handler
         */
        fb.mouseup = function() {
            // Uncapture mouse
            $(document).unbind('mousemove', fb.mousemove);
            $(document).unbind('mouseup', fb.mouseup);
            document.dragging = false;
        };

        /**
         * Update the markers and styles
         */
        fb.updateDisplay = function() {
            // Markers
            var angle = fb.hsl[0] * 6.28;
            $('.h-marker', e).css({
                left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
                top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
            });

            $('.sl-marker', e).css({
                left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
                top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
            });

            // Saturation/Luminance gradient
            $('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));

            // Linked elements or callback
            if (typeof fb.callback == 'object') {
                // Set background/foreground color
                $(fb.callback).css({
                    backgroundColor: fb.color,
                    color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
                });

                // Change linked value
                $(fb.callback).each( function() {
                    if (this.value && this.value != fb.color) {
                        this.value = fb.color;
                    }
                });

            } else {
                if (typeof fb.callback == 'function') {
                    fb.callback.call(fb, fb.color);
                }
            }
        };

        /**
         * Get absolute position of element
         */
        fb.absolutePosition = function(el) {
            var r = {
                x: el.offsetLeft,
                y: el.offsetTop
            };
            // Resolve relative to offsetParent
            if (el.offsetParent) {
                var tmp = fb.absolutePosition(el.offsetParent);
                r.x += tmp.x;
                r.y += tmp.y;
            }
            return r;
        };

        /* Various color utility functions */
        fb.pack = function(rgb) {
            var r = Math.round(rgb[0] * 255);
            var g = Math.round(rgb[1] * 255);
            var b = Math.round(rgb[2] * 255);
            return '#' + (r < 16 ? '0' : '') + r.toString(16) +
            (g < 16 ? '0' : '') +
            g.toString(16) +
            (b < 16 ? '0' : '') +
            b.toString(16);
        };

        fb.unpack = function(color) {
            if (color.length == 7) {
                return [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
            } else if (color.length == 4) {
                return [parseInt('0x' + color.substring(1, 2)) / 15, parseInt('0x' + color.substring(2, 3)) / 15, parseInt('0x' + color.substring(3, 4)) / 15];
            }
        };

        fb.HSLToRGB = function(hsl) {
            var m1, m2, r, g, b;
            var h = hsl[0], s = hsl[1], l = hsl[2];
            m2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
            m1 = l * 2 - m2;
            return [this.hueToRGB(m1, m2, h + 0.33333), this.hueToRGB(m1, m2, h), this.hueToRGB(m1, m2, h - 0.33333)];
        };

        fb.hueToRGB = function(m1, m2, h) {
            h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
            if (h * 6 < 1)
                return m1 + (m2 - m1) * h * 6;
            if (h * 2 < 1)
                return m2;
            if (h * 3 < 2)
                return m1 + (m2 - m1) * (0.66666 - h) * 6;
            return m1;
        };

        fb.RGBToHSL = function(rgb) {
            var min, max, delta, h, s, l;
            var r = rgb[0], g = rgb[1], b = rgb[2];
            min = Math.min(r, Math.min(g, b));
            max = Math.max(r, Math.max(g, b));
            delta = max - min;
            l = (min + max) / 2;
            s = 0;
            if (l > 0 && l < 1) {
                s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
            }
            h = 0;
            if (delta > 0) {
                if (max == r && max != g)
                    h += (g - b) / delta;
                if (max == g && max != b)
                    h += (2 + (b - r) / delta);
                if (max == b && max != r)
                    h += (4 + (r - g) / delta);
                h /= 6;
            }
            return [h, s, l];
        };

        // Install mousedown handler (the others are set on the document on-demand)
        $('*', e).mousedown(fb.mousedown);

        // Init color
        fb.setColor(fb.clr);

        // Set linked elements/callback
        if (callback) {
            fb.linkTo(callback);
        }
    };

})(jQuery);