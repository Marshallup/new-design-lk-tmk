// = ./apart/jquery.datetimepicker.min.js
$.datetimepicker.setLocale('ru');
$('#datetimepicker').datetimepicker({
 timepicker:false,
 format:'d.m.Y',
 });
 $('.sertificate-form-select').select2({
  minimumResultsForSearch: 7,
   width: '100%'
 });

 var headerType = $('.header-type__current');
 headerType.click(function(event) {
  event.stopPropagation();
   var list = $(this).parent().find('.header-type-list');

   $(this).toggleClass('header-type__current--show')
   list.toggleClass('header-type-list--show');
 })
 $(document.body).click(function(event) {
  var list = headerType.parent().find('.header-type-list');
  headerType.removeClass('header-type__current--show');
  list.removeClass('header-type-list--show')
 })