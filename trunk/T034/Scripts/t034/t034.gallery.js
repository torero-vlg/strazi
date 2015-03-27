function  getWork(file, targetId) {
	$.ajax({
		url: "Home/Work",
		data: { file: file }
	})
  .done(function (html) {
	  $(targetId).html(html);
  });
}

$('.gallery ul li img').click(function () {
    var src = this.src;
    getWork(src.substring(src.lastIndexOf('/') + 1), $(this).data("target"));
});