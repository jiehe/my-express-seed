
/**
 * Created by lijiehe on 15/5/6.
 */



//标签云
$(function() {
    $.get('/tags')
        .then(function(tags) {
            var jqCloud = [];
            _.each(tags, function(tag) {
                var item = {
                    text: tag.tag,
                    link: '/category/' + tag.tag,
                    weight: tag.fontSize
                };
                jqCloud.push(item);
            })
            console.log(jqCloud);
            $('#tagsCloud').jQCloud(jqCloud);
        })
})