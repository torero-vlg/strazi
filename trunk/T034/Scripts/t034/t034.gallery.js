function  getWork(file, targetId, url) {
	$.ajax({
		url: url,
		data: { file: file }
	})
  .done(function (html) {
	  $(targetId).html(html);
  });
}

$('.gallery ul li img').click(function () {
    var src = this.src;
    getWork(src.substring(src.lastIndexOf('/') + 1), $(this).data("target"), $(this).data("src"));
});