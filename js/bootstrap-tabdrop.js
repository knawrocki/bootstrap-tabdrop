/* =========================================================
 * bootstrap-tabdrop.js 
 * http://www.eyecon.ro/bootstrap-tabdrop
 * https://github.com/carterschieffer/bootstrap-tabdrop
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Copyright 2016 Carter Schieffer
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function($){
    var WinResizer = (function(){
        var registered = [];
        var inited = false;
        var timer;
        var resize = function(ev) {
            clearTimeout(timer);
            timer = setTimeout(notify, 100);
        };
        var notify = function() {
            for(var i=0, cnt=registered.length; i<cnt; i++) {
                registered[i].apply();
            }
        };
        return {
            register: function(fn) {
                registered.push(fn);
                if (inited === false) {
                    $(window).bind('resize', resize);
                    inited = true;
                }
            },
            unregister: function(fn) {
                for(var i=0, cnt=registered.length; i<cnt; i++) {
                    if (registered[i] == fn) {
                        delete registered[i];
                        break;
                    }
                }
            }
        }
    }());

    var TabDrop = function(element, options) {
        this.el = $(element);
        this.drdn = $('<li class="dropdown pull-right tabdrop" style="display:none;"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+options.text+'</a><ul class="dropdown-menu" role="tablist"></ul></li>');
        if (this.el.parent().is('.tabs-below')) {
            this.drdn.addClass('dropup');
        }

        this.drdn.appendTo(this.el);
        this.el.find('li').not('.tabdrop').clone().prependTo( this.drdn.find('ul.dropdown-menu') );

        WinResizer.register($.proxy(this.layout, this));
        this.layout();
        
        if (this.el.find('li:first-child a').data('toggle') == 'pill' || this.el.find('li:first-child a').data('toggle') == 'tab'){
            if (this.el.find('li.active').length > 0){
                this.el.find('li.active a').tab('show');
            }else{
                this.el.find('li:first-child a').tab('show');
            }
        }
    };

    TabDrop.prototype = {
        constructor: TabDrop,

        layout: function() {
            var el = this.el,
                drdn = this.drdn;
            var totalWidth = 0;
            var ulWidth = el.width();
        
            el.find('li').not('.tabdrop').each(function(){
                totalWidth += $(this).outerWidth(true);
            });

            el.find('a').on('shown.bs.tab', function(e){
                var selIndex = $(this).parent('li').index();
                
                el.find('>li').removeClass('active');
                el.find('>li').eq(selIndex).addClass('active');

                drdn.find('li').removeClass('active');
                drdn.find('li').eq(selIndex).addClass('active');

                if (el.hasClass('condensed')){
                    el.find('>li').not('.tabdrop').hide()
                    el.find('>li.active').not('.tabdrop').show()
                }
            });

            if (totalWidth > ulWidth){
                el.addClass('condensed');
                el.find('>li').not('.active, .tabdrop').hide();
                drdn.show();
            }else{
                el.removeClass('condensed');
                el.find('>li').not('.tabdrop').show();
                drdn.hide();
            }
        }
    }

    $.fn.tabdrop = function ( option ) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tabdrop'),
                options = typeof option === 'object' && option;
            if (!data)  {
                $this.data('tabdrop', (data = new TabDrop(this, $.extend({}, $.fn.tabdrop.defaults,options))));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    };

    $.fn.tabdrop.defaults = {
        text: 'More'
    };

    $.fn.tabdrop.Constructor = TabDrop;

}(window.jQuery));