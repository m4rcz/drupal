// $Id: thickbox_auto.js,v 1.6.2.2 2008/09/23 08:04:46 frjo Exp $

/**
 * ATTENTION: this script has to be loaded _before_ thickbox.js
 * Contributed by user kleingeist.
 */
var AUTOFORMAT_DERIVATIVE = "gallery overview";
var AUTOFORMAT_DERIVATIVE_CSS_CLASS = "image-gallery";

Drupal.behaviors.initThickboxAuto = function(context) {

  // 1. "mark" the category overview pictures.
  $("ul.galleries a > img.image."+AUTOFORMAT_DERIVATIVE_CSS_CLASS).parent().addClass("category");

  // 2. Group the images in specific contexts,

  // find all the nodes,
  $(".node .content").each(function(i) {
    var group = "node-g" + i;
    TB_drupal_rewrite(this, group);
  });

  // find the categories.
  $("ul.images").each(function(i) {
    var group = "gallery-g" + i;
    TB_drupal_rewrite(this, group);
  });

  // 3. Rewrite the remaining images without grouping.
  TB_drupal_rewrite(document, null);
}

function TB_drupal_rewrite(context, group) {
  // Process only images, that have not been rewritten (.thickbox) and that are not categories.
  $("a > img.image."+AUTOFORMAT_DERIVATIVE_CSS_CLASS, context).parent().not(".thickbox").not(".category").each(function(i) {
    var img = $(this).children("img");
    var title = $(this).attr("title") || img.attr("title") || img.attr("alt") || null;
    var settings = Drupal.settings.thickbox;

    /**
     * ATTENTION: Until the derivate Bug (http://drupal.org/node/125610) is fixed,
     * the script should allways use the original picture ("true || ").
     */
    if (settings.derivative == "_original") {
      var href = img.attr("src").replace("."+AUTOFORMAT_DERIVATIVE, "");
    }
    else {
      var href = img.attr("src").replace("."+AUTOFORMAT_DERIVATIVE, "." + settings.derivative);
    }

    // Finally rewrite the link and wait for thickbox.js to apply the effects.
    $(this).attr({href: href, title: title, rel: group});
    $(this).addClass("thickbox");
  });
}
