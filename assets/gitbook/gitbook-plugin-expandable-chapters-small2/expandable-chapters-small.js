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

        // Add triggers and event handlers to chapters and list items
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

        $(CHAPTER + ' li')
            .find(ARTICLE_CHILDREN)
            .prev()
            .css('cursor', 'pointer')
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleLi($(e.target).closest('li'));
            })
            .append(TRIGGER_TEMPLATE);

        expand(lsItem());

        // expand current selected chapter with its parents
        var activeChapter = $(CHAPTER + '.active');
        expand(activeChapter);

        // expand current selected chapter's children
        activeChapter.find(ARTICLE_CHILDREN).closest(FOLDABLE).each(function () {
            expand($(this));
        });

        // expand current selected li with its parents
        var activeLi = $('li.active');
        expandLi(activeLi);

        // expand current selected li's children
        activeLi.find(ARTICLE_CHILDREN).closest('li').each(function () {
            expandLi($(this));
        });
    }

    var toggle = function ($chapter) {
        if ($chapter.hasClass(TOGGLE_CLASSNAME)) {
            collapse($chapter);
        } else {
            expand($chapter);
        }
    }

    var toggleLi = function ($li) {
        if ($li.hasClass(TOGGLE_CLASSNAME)) {
            collapseLi($li);
        } else {
            expandLi($li);
        }
    }

    var collapse = function ($chapter) {
        if ($chapter.length && $chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.removeClass(TOGGLE_CLASSNAME);
            lsItem($chapter);
        }
    }

    var collapseLi = function ($li) {
        if ($li.length && $li.hasClass(TOGGLE_CLASSNAME)) {
            $li.removeClass(TOGGLE_CLASSNAME);
            lsItem($li);
        }
    }

    var expand = function ($chapter) {
        if ($chapter.length && !$chapter.hasClass(TOGGLE_CLASSNAME)) {
            $chapter.addClass(TOGGLE_CLASSNAME);
            lsItem($chapter);
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
            return $(CHAPTER).add('li').map(function (index, element) {
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
