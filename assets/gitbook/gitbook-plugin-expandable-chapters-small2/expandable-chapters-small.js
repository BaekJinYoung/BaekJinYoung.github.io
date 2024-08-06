require(['gitbook', 'jQuery'], function (gitbook, $) {
    var PLUGIN = 'expandable-chapter-small2',
        TOGGLE_CLASSNAME = 'expanded',
        CHAPTER = '.chapter',
        ARTICLES = '.chapter ul',
        FOLDABLE = '.chapter, .chapter li',
        ARTICLE_CHILDREN = 'ul',
        TRIGGER_TEMPLATE = '<i class="exc-trigger fa"></i>',
        LS_NAMESPACE = 'expChapters';

    var init = function () {
        var config = gitbook.state.config.pluginsConfig || {};
        var articlesExpand = false;
        if (config && config[PLUGIN]) {
            articlesExpand = config[PLUGIN].articlesExpand || false;
        }

        // Adding the trigger element to each ARTICLES parent and binding the event
        if (articlesExpand) {
            $(ARTICLES)
                .parent(CHAPTER)
                .find(ARTICLE_CHILDREN)
                .prev()
                .css('cursor', 'pointer')
                .on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle($(e.target).closest(FOLDABLE));
                })
                .append(TRIGGER_TEMPLATE);
        } else {
            $(ARTICLES)
                .parent(CHAPTER)
                .find(ARTICLE_CHILDREN)
                .prev()
                .append(
                    $(TRIGGER_TEMPLATE)
                        .on('click', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            toggle($(e.target).closest(FOLDABLE));
                        })
                );
        }

        // Adding click event to li elements to toggle their ul children
        $(CHAPTER + ' li').css('cursor', 'pointer')
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggle($(this).find(ARTICLE_CHILDREN));
            });

        expand(lsItem());

        // Expand current selected chapter with its parents
        var activeChapter = $(CHAPTER + '.active');
        expand(activeChapter);

        // Expand current selected chapter's children
        activeChapter.find(ARTICLE_CHILDREN).closest(FOLDABLE).each(function () {
            expand($(this));
        });
    }

    var toggle = function ($element) {
        if ($element.hasClass('expanded')) {
            collapse($element);
        } else {
            expand($element);
        }
    }

    var collapse = function ($element) {
        if ($element.length && $element.hasClass(TOGGLE_CLASSNAME)) {
            $element.removeClass(TOGGLE_CLASSNAME);
            lsItem($element);
        }
    }

    var expand = function ($element) {
        if ($element.length && !$element.hasClass(TOGGLE_CLASSNAME)) {
            $element.addClass(TOGGLE_CLASSNAME);
            lsItem($element);
        }
    }

    var lsItem = function () {
        var map = JSON.parse(localStorage.getItem(LS_NAMESPACE)) || {}
        if (arguments.length) {
            var $elements = arguments[0];
            $elements.each(function (index, element) {
                var level = $(this).data('level');
                var value = $(this).hasClass(TOGGLE_CLASSNAME);
                map[level] = value;
            })
            localStorage.setItem(LS_NAMESPACE, JSON.stringify(map));
        } else {
            return $(CHAPTER).map(function (index, element) {
                if (map[$(this).data('level')]) {
                    return this;
                }
            })
        }
    }

    gitbook.events.bind('page.change', function () {
        init()
    });
});