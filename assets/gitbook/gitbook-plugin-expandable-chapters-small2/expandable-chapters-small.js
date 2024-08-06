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
        // adding the trigger element to each ARTICLES parent and binding the event
        var config = gitbook.state.config.pluginsConfig || {};
        var articlesExpand = false;
        if (config && config[PLUGIN]) {
            articlesExpand = config[PLUGIN].articlesExpand || false;
        }

        // Add trigger for chapter elements
        $(CHAPTER).each(function () {
            var $chapter = $(this);
            var $children = $chapter.find(ARTICLE_CHILDREN);
            if ($children.length) {
                $chapter
                    .find('> a, > span')
                    .css('cursor', 'pointer')
                    .append(TRIGGER_TEMPLATE)
                    .on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleChapter($chapter);
                    });
            }
        });

        // Add trigger for li elements
        $(CHAPTER + ' li').each(function () {
            var $li = $(this);
            var $children = $li.find(ARTICLE_CHILDREN);
            if ($children.length) {
                $li
                    .find('> a, > span')
                    .css('cursor', 'pointer')
                    .append(TRIGGER_TEMPLATE)
                    .on('click', function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleLi($li);
                    });
            }
        });

        expand(lsItem());

        // expand current selected chapter with its parents
        var activeChapter = $(CHAPTER + '.active');
        expand(activeChapter);

        // expand current selected chapter's children
        activeChapter.find(ARTICLE_CHILDREN).closest(FOLDABLE).each(function () {
            expand($(this));
        });
    }

    var toggleChapter = function ($chapter) {
        if ($chapter.hasClass('expanded')) {
            collapseChapter($chapter);
        } else {
            expandChapter($chapter);
        }
    }

    var toggleLi = function ($li) {
        if ($li.hasClass('expanded')) {
            collapseLi($li);
        } else {
            expandLi($li);
        }
    }

    var collapseChapter = function ($chapter) {
        if ($chapter.length && $chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.removeClass(TOGGLE_CLASSNAME);
            lsItem($chapter);
        }
    }

    var expandChapter = function ($chapter) {
        if ($chapter.length && !$chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.addClass(TOGGLE_CLASSNAME);
            lsItem($chapter);
        }
    }

    var collapseLi = function ($li) {
        if ($li.length && $li.hasClass(TOGGLE_CLASSNAME)) {
            $li.removeClass(TOGGLE_CLASSNAME);
            lsItem($li);
        }
    }

    var expandLi = function ($li) {
        if ($li.length && !$li.hasClass(TOGGLE_CLASSNAME)) {
            $li.addClass(TOGGLE_CLASSNAME);
            lsItem($li);
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
        init();
    });
});
