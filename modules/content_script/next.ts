// function loadAjax() {
//     $("#comment-page").on("click", "#toggle-editor-button", function() {
//         $("#editor-wrap-0").empty();
//     });

//     function replyOrEdit(element: any, edit: boolean) {
//         var cid = element.attr("cid");
//         var prevcid = $("#comment-editor-wrapper").attr("cid");

//         $("#editor-wrap-" + prevcid).hide();
//         $("#reply-and-edit-" + prevcid).show();

//         $("#editor-wrap-" + cid).show();
//         $("#reply-editor").val("");
//         $("#comment-editor-wrapper").prependTo($("#editor-wrap-" + cid));

//         $("#comment-editor-wrapper").attr("cid", cid);
//         $("#comment-send-butt").attr("cid", cid);

//         $("#reply-and-edit-" + cid).hide();
//         if (edit) {
//             $("#comment-send-butt").attr("editid", cid);
//             var content = $('#comment-content-' + cid + " .comment-text-content").text();
//             $("#reply-editor").val(content);
//         } else {
//             $("#comment-send-butt").attr("editid", 0);
//         }

//         $("#reply-editor").focus();
//         $("#reply-editor")[0].setSelectionRange($("#reply-editor").val().length, $("#reply-editor").val().length);
//     }

//     $("#comment-page").on("click", ".edit", function() {
//         var elem = $(this);
//         replyOrEdit(elem, true);
//     })

//     $("#comment-page").on("click", ".reply", function() {
//         var elem = $(this);
//         replyOrEdit(elem, false);
//     });

//     $("#comment-page").on('click', ".cancel-button", function() {
//         var cid = $(this).attr("cid");
//         var prevcid = $("#comment-editor-wrapper").attr("cid");
//         $("#editor-wrap-" + prevcid).hide();
//         $("#reply-and-edit-" + prevcid).show();
//         $("#reply-editor").val("");
//         $("#comment-editor-wrapper").prependTo($("#editor-wrap-" + cid));
//     });

//     $("#comment-page").on("click", ".vertical-separator", function() {
//         var cid = $(this).attr("cid");
//         var containerIdToFind = "#subcomments-container-" + cid;

//         var container = $("#subcomments-container-" + cid);
//         if (container.is(":hidden")) {
//             container.show();
//             $(this).removeClass("something-to-hide");
//             $("#vertical-separator-plus-" + cid).hide();
//             $("#vertical-separator-minus-" + cid).show();
//         } else {
//             container.hide();
//             $(this).addClass("something-to-hide");
//             $("#vertical-separator-plus-" + cid).show();
//             $("#vertical-separator-minus-" + cid).hide();
//         }
//     })

//     $("#comment-page").on("click", ".send-button", function(event: any) {
//         var cid = $(this).attr("cid");
//         var editid = $(this).attr("editid");

//         if (editid > 0) {
//             try {
//                 let request =
//                     $.ajax({
//                         type: "POST",
//                         url: this.getAttribute("url"),
//                         data: {
//                             action: "edit_ajax_comment",
//                             comment_post_ID: $('#comment-page').attr("postId"),
//                             comment_ID: cid,
//                             content: $("#reply-editor").val(),

//                         },
//                         action: "edit_ajax_comment",
//                         dataType: 'json',
//                     });
//                 request.done(function(output: any) {
//                     //Code à jouer en cas d'éxécution sans erreur du script du PHP
//                     if (output.success) {
//                         //location.reload();const 
//                         // element = document.getElementById("loading-post");
//                         // element.removeChild();
//                         $("#comment-page").load(location.href + " #comment-page > *", reloadCommentaires);
//                     }
//                 });
//                 request.fail(function(error: any) {
//                     //Code à jouer en cas d'éxécution en erreur du script du PHP ou de ressource introuvable
//                 });
//                 request.always(function() {
//                     //Code à jouer après done OU fail quoi qu'il arrive

//                 });
//             } catch (e) {
//                 //alert(e, "edit");
//             }
//         } else {
//             try {
//                 let request = $.ajax({
//                     type: "POST",
//                     url: this.getAttribute("url"),
//                     data: {
//                         action: "post_ajax_comment",
//                         comment_post_ID: $('#comment-page').attr("postId"),
//                         comment_ID: cid,
//                         content: $("#reply-editor").val(),
//                     },
//                     action: "post_ajax_comment",
//                     dataType: 'json',
//                 });
//                 request.done(function(output: any) {
//                     // console.log(output);
//                     //Code à jouer en cas d'éxécution sans erreur du script du PHP
//                     if (output.success) {

//                         $("#comment-page").load(location.href + " #comment-page > *", reloadCommentaires);
//                         const url = "https://next.ink/wp-admin/admin-ajax.php";
//                         const data = {
//                             action: 'insert_or_update_count_diff',
//                             post_id: $('#comment-page').attr("postId"),
//                             last_comment_id: output.data.id,
//                         }
//                         $.ajax({
//                             url: url,
//                             type: 'POST',
//                             data: data,
//                             success: function(_data: any) {},
//                             error: function(_error: any) {}
//                         })
//                     }
//                 });
//                 request.fail(function(_error: any) {

//                 });
//                 request.always(function() {

//                 });
//             } catch (e) {
//                 //alert(e, 'addd');
//             }
//         }
//     });
//     $('.send-button').off('click');
// }