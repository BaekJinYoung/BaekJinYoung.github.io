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

        // Add triggers and event handlers to chapters
        $(CHAPTER)
            .find('> ul')
            .prev()
            .css('cursor', 'pointer')
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleLi($(e.target).closest(CHAPTER).find('li'));
            })
            .append(TRIGGER_TEMPLATE);

        // Add triggers and event handlers to list items
        $(CHAPTER + ' li')
            .find(ARTICLE_CHILDREN)
            .prev()
            .css('cursor', 'pointer')
            .on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                toggleUl($(e.target).closest('li'));
            })
            .append(TRIGGER_TEMPLATE);

        expand(lsItem());

        // Expand current selected chapter with its children
        var activeChapter = $(CHAPTER + '.active');
        expandLi(activeChapter.find('li'));

        // Expand current selected li with its children
        var activeLi = $('li.active');
        expandUl(activeLi);
    }

    var toggleLi = function ($li) {
        if ($li.hasClass(TOGGLE_CLASSNAME)) {
            collapseLi($li);
        } else {
            expandLi($li);
        }
    }

    var toggleUl = function ($li) {
        if ($li.hasClass(TOGGLE_CLASSNAME)) {
            collapseUl($li);
        } else {
            expandUl($li);
        }
    }

    var collapseLi = function ($li) {
        if ($li.length && $li.hasClass(TOGGLE_CLASSNAME)) {
            $li.removeClass(TOGGLE_CLASSNAME);
            lsItem($li);
        }
    }

    var collapseUl = function ($li) {
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

    var expandUl = function ($li) {
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
