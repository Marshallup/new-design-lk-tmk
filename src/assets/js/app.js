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


// search sertificate

$('#factory-sertificate').select2({
  minimumResultsForSearch: 7,
  width: '100%'
 });

 //! datepickers
const dateIssueStart = $('#date-issue-start'),
dateIssueEnd = $('#date-issue-end'),
dateCreateStart = $('#date-create-start'),
dateCreateEnd = $('#date-create-end'),
dateChangeStart =  $('#date-change-start'),
dateChangeEnd = $('#date-change-end');

initDatePickerRange('#date-issue-start', '#date-issue-end', dateIssueStart, dateIssueEnd);
initDatePickerRange('#date-create-start', '#date-create-end', dateCreateStart, dateCreateEnd);
initDatePickerRange('#date-change-start', '#date-change-end', dateChangeStart, dateChangeEnd);

//====
const dateContract = $('#date-contract'),
dateSpec = $('#date-spec');

  dateContract.datetimepicker({
    format:'d.m.Y',
    timepicker:false,
    mask: true
  });
  setIconDatePicker(dateContract);
  //
  dateSpec.datetimepicker({
    format:'d.m.Y',
    timepicker:false,
    mask: true
  });
  setIconDatePicker(dateSpec);


function initDatePickerRange(startSel, endSelect, elStrt, elEnd) {
  elStrt.datetimepicker({
    format:'d.m.Y',
    formatDate:'d.m.Y',
    onShow:function( ct ){
      let dateNative = $(endSelect).val();
      let date = Number(dateNative[0]);
      this.setOptions({
        minDate: !isNaN(date) ? dateNative : false,
      })
    },
    timepicker:false,
    mask: true
   });

   elEnd.datetimepicker({
    format:'d.m.Y',
    formatDate:'d.m.Y',
    onShow:function( ct ){
      let dateNative = $(startSel).val();
      let date = Number(dateNative[0]);
      this.setOptions({
        minDate: !isNaN(date) ? dateNative : false,
      })
    },
    timepicker:false,
    mask: true
   });

  setIconDatePicker(elStrt);
  setIconDatePicker(elEnd);
}

function setIconDatePicker(el) {
  el.parent().find('.sertificates-form-item__input-time__icon').click(function() {
    el.datetimepicker('show');
  });
};



// TABULATOR

$('#table-count').select2({
  minimumResultsForSearch: 7,
   width: '50'
 });

var tabledata = [
  {id:1, name:"??????", age:"1786_2", col:"30.05.2021", dob:"52974862", count_str: "5", num_contract: "??-????-1414", date_contract: "03.03.2020", num_spec: "17", date_spec: "09.12.2020", attachment: "2"},
  {id:2, name:"??????", age:"1786_2", col:"30.05.2021", dob:"52974862", count_str: "5", num_contract: "??-????-1414", date_contract: "03.03.2020", num_spec: "17", date_spec: "09.12.2020", attachment: "2"},
  {id:3, name:"??????", age:"1786_2", col:"01.05.2021", dob:"52974861", count_str: "5", num_contract: "??-????-1414", date_contract: "03.03.2020", num_spec: "17", date_spec: "09.12.2020", attachment: "0"},
];

var table = new Tabulator("#sertificates-table", {
  pagination:"local",
  paginationSize:2,
  paginationAddRow:"table",
  // height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
  data:tabledata, //assign data to table
  layout:"fitColumns", //fit columns to width of table (optional)
  columns:[ //Define Table Columns
    {title:"??????????", field:"name", width:150, formatter:function(cell, formatterParams, onRendered){
      return '<label class="check-factory"><div class="check-factory-checkbox"><input type="checkbox"/><span></span></div><div class="check-factory__title">' + cell.getValue() + '</div></label>'
  }},
    {title:"??? ????", field:"age", hozAlign:"left", formatter:function(cell, formatterParams, onRendered){
      return '<a href="#" class="table__link" href="#">' + cell.getValue() +'</a>';
  }},
    {title:"???????? ????", field:"col"},
    {title:"??? ????????????. ????-????", field:"dob", sorter:"date", hozAlign:"center"},
    {title:"??????. ??????.", field:"count_str", width:150},
    {title:"??? ??????????????????", field:"num_contract", hozAlign:"left"},
    {title:"???????? ??????????????????", field:"date_contract"},
    {title:"??? ????????????????????????", field:"num_spec", sorter:"date", hozAlign:"center"},
    {title:"???????? ????????????????????????", field:"date_spec"},
    {title:"????????????????????", field:"attachment", sorter:"date", hozAlign:"center", formatter:function(cell, formatterParams, onRendered){
      let val = cell.getValue();
      val = parseInt(val);

      let template_link = '<a class="table__attach">' + val + '</a>';
      let template_span = '<span class="table__attach--null">' + val + '</span>';

      if (val === 0) {
        return template_span;
      }

      return template_link;
  }},
  ],
  pageLoaded: function(pageno) {
    console.log('pageLoad');
    initEventModal();
  },
});
$('#table-count').on('change', function() {
  table.setPageSize($(this).val());
});

function initEventModal() {
  // console.log($('.table__attach'))
  $('.table__attach').click(function() {
    $('body, html').addClass('lock');
    $('.modal-wrapper').fadeIn(300)
  });
}

$('.modal-attach__close').click(function() {
  $('.modal-wrapper').fadeOut(300);
  $('body, html').removeClass('lock');
});

$('.modal-attach__clear-choises-wrap').click(function() {
  const $inputsCheck = $('.modal-attach-table-checkbox input');
  const btnDonwn = $('.modal-attach__btn--download');

  $inputsCheck.prop('checked', false);
  btnDonwn.text(btnDonwn.data('text-orig'));
  $(this).hide();
})

$('.modal-attach-table-checkbox input').on('change', function() {
  let countCheck = 0;
  const $clearChecked = $('.modal-attach__clear-choises-wrap');
  const btnDownload = $('.modal-attach__btn--download');
  const btnDownloadDataText = btnDownload.data('text-check');

  $('.modal-attach-table-checkbox input').each(function(idx, item) {
    const $item = $(item);

    if ($item.prop('checked')) {
      countCheck++;
    } 

  });

  if (countCheck) {
    $clearChecked.show();
    btnDownload.text(btnDownloadDataText);
  } else {
    $clearChecked.hide();
    btnDownload.text(btnDownload.data('text-orig'));
  }
})
