/*Book Pages Selection Accordian Module*/

(function () {
  'use strict';
  var s,
    findParts,
    state,
    orderHeadTpl,
    orderLineTpl,
    pageCheckboxActions,
    bookSectionAccordian = {
      settings: {
        $filterTrigger: $('#filter-level').find('input[type="checkbox"]'), // All the filter Button on the header
        $bookArray: []
      },

      findSubSectionParts: function (element, id) {
        var li = element.hasClass('page-list-item') ? element : element.closest('li.page-list-item');
        var btn = element.hasClass('book-subsection-btn') ? element : li.find('button');
        var pnl = li.next('.book-subsection[data-subpage="' + id + '"]');
        var spn = element.hasClass('pages-checkbox-span') ? element : li.find('.pages-checkbox-span')
        var chk = element.hasClass('pages-checkbox-span') ? element.children('input').first() : li.find('input');
        var bxs = pnl.find('input.subpage-input');
        return {
          li: li,
          btn: btn,
          pnl: pnl,
          spn: spn,
          chk: chk,
          bxs: bxs
        };
      },

      triStateSwitchState: function (element) {
        return element.hasClass('selected') ? 'on' : element.hasClass('indeterminate') ? 'ind' : 'off';
      },

      init: function () {
        s = this.settings;
        findParts = this.findSubSectionParts;
        state = this.triStateSwitchState;
        orderHeadTpl = '<UserOrder><custOrder></custOrder><custName></custName>' +
          '<addressLine1></addressLine1><addressLine2></addressLine2><addressLine3></addressLine3><street></street><city></city>' +
          '<district></district><postcode></postcode><countryCode></countryCode><orderDate></orderDate>' +
          '<deliveryEmail></deliveryEmail><ref1></ref1><Orderlines></Orderlines></UserOrder>';
        orderLineTpl = '<Orderline><productCode></productCode><productDesc></productDesc><qtyOrdered></qtyOrdered><spare1></spare1><spare2></spare2></Orderline>';
        pageCheckboxActions = this.bindLowestCheckboxActions;
        this.bindUIActions();

      },

      bindLowestCheckboxActions: function (element) {
        $('.subpage-label').unbind('click');
        $('.subpage-label').on('click', function (event) {
          setTimeout(function () {
            var chks = $(event.target).closest('.book-subsection').find('.subpage-label').length;
            var chkd = $(event.target).closest('.book-subsection').find('input[type="checkbox"]:checked').length;
            var subChk = $(event.target).closest('.page-list').find('span.pages-checkbox-span').first();

            subChk.children('span').remove();
            if (chkd === 0) {
              subChk.removeClass('selected');
              subChk.removeClass('indeterminate');
              subChk.find('input').first().prop('checked', false);
            } else if (chkd === chks) {
              subChk.removeClass('indeterminate');
              subChk.find('input').first().prop('checked', true);
              subChk.append('<span></span>');
              subChk.addClass('selected');
            } else {
              subChk.append('<span></span>');
              subChk.find('input').first().prop('checked', true);
              subChk.addClass('indeterminate');
              subChk.removeClass('selected');
            }

          }, 50);
        });
      },

      bindUIActions: function () {

        // Preview Pack
        $('body').on('click', '#btn-preview', function (event) {
          bookSectionAccordian.preview(event);
        });


        // Build Pack
        $(document).on('click','.build-btn', function (e) {
          e.preventDefault();

          var $orderHeadTpl;
          var $orderLineTpl;

          var $orderHeadTpl = $.parseXML(orderHeadTpl);
          var $orderHeadXml = $($orderHeadTpl);

          var $orderLineTpl = $.parseXML(orderLineTpl);
          var $orderLineXml = $($orderLineTpl);

          // Find the level checked
          var $inputs = $('input[name="book-selector"]:checked')[0];
          var dataLevel = $inputs.getAttribute('data-level'); // Add this to the Product Code 


          $orderHeadXml.find('UserOrder custOrder').text('12345678');
          $orderHeadXml.find('UserOrder custName').text('John Smith');
          $orderHeadXml.find('UserOrder addressLine1').text('Liston Exchange');
          $orderHeadXml.find('UserOrder addressLine2').text('');
          $orderHeadXml.find('UserOrder addressLine3').text('');
          $orderHeadXml.find('UserOrder street').text('Liston Court');
          $orderHeadXml.find('UserOrder city').text('Marlow');
          $orderHeadXml.find('UserOrder district').text('Bucks');
          $orderHeadXml.find('UserOrder postcode').text('SL7 1BG');
          $orderHeadXml.find('UserOrder countryCode').text('GB');
          $orderHeadXml.find('UserOrder orderDate').text(new Date(Date.now()).toLocaleString());
          $orderHeadXml.find('UserOrder deliveryEmail').remove();
          $orderHeadXml.find('UserOrder ref1').text('CTR01');

          var addedProds = [];

          if ($('input[type="checkbox"]:checked').length >= 1) {

            var checkMain = new Promise(function (resolve, reject) {
              // Build Order
              $.each($('input[type="checkbox"]:checked'), function (idx, chk) {
                if ($(chk).data('prodcode') !== undefined) {
                  var maincode = Math.floor($(chk).data('prodcode') / 1000) * 1000;
                  $('input[data-prodcode="' + maincode + '"]').prop('checked', true);
                }
              });

              resolve(true);
            });

            checkMain.then(function (success) {

              var $thisLine = $orderLineXml;
              $thisLine.find('Orderline productCode').text('0000');
              $thisLine.find('Orderline productDesc').text('Main Folder');
              $thisLine.find('Orderline qtyOrdered').text('1');
              $thisLine.find('Orderline spare1').text('00');
              $thisLine.find('Orderline spare2').text('Neutral');
              $orderHeadXml.find('UserOrder Orderlines').append('<Orderline>' + $thisLine.find('Orderline').html() + '</Orderline>');


              var $thisLine = $orderLineXml;
              $thisLine.find('Orderline productCode').text('0050');
              $thisLine.find('Orderline productDesc').text('Treatment Centre Letter');
              $thisLine.find('Orderline qtyOrdered').text('1');
              $thisLine.find('Orderline spare1').text('01');
              $thisLine.find('Orderline spare2').text('Neutral');
              $orderHeadXml.find('UserOrder Orderlines').append('<Orderline>' + $thisLine.find('Orderline').html() + '</Orderline>');

              // Build Order
              $.each($('input[type="checkbox"]:checked'), function (idx, chk) {

                if (addedProds.indexOf($(chk).data('prodcode')) === -1 && $(chk).data('prodcode') !== undefined) {
                  var $thisLine = $orderLineXml;
                  var prodCode = $(chk).data('prodcode');
                  var dataCode = parseInt(dataLevel);
                  var ProductCode = prodCode + dataCode;

                  $thisLine.find('Orderline productCode').text(ProductCode);
                  $thisLine.find('Orderline productDesc').text($(chk).data('proddesc'));
                  $thisLine.find('Orderline qtyOrdered').text('1');
                  $thisLine.find('Orderline spare1').text('0' + (idx + 2));
                  $thisLine.find('Orderline spare2').text($(chk).data('prodtab'));

                  $orderHeadXml.find('UserOrder Orderlines').append('<Orderline>' + $thisLine.find('Orderline').html() + '</Orderline>');
                  addedProds.push($(chk).data('prodcode'));
                }
              });


              /* Data to go inside the xml Modal */
              var xml = '<?xml version="1.0"?>';
              xml += "<UserOrder>";
              xml += $orderHeadXml.find('UserOrder').html();
              xml += "</UserOrder>";

              /* Publish the xml output for sharing */
              PubSub.publish(_EventManagement.Topic[0], xml);

              /* Show the collation Template  */
              $('#content').removeClass(); // Get the Book creator styles off the page
              _TemplateLoader.init('buildPack');
            });
          }
        });

        //Discard Selected Section
        $(document).on('click', '.discard-btn', function (e) {
          e.preventDefault();
          bookSectionAccordian.discard();
        });

        //SubMain Section
        $(".page-list-item").on('click', function (event) {


          if ($(event.target).hasClass('pages-checkbox-span'))
            return;

          var id = $(this).attr("data-subpage");
          var parts = findParts($(event.target), id);

          if ($(event.target).hasClass('pages-checkbox-span'))
            return;

          if (parts.li.hasClass('selected')) {
            parts.pnl.slideUp();
            parts.li.removeClass('selected');
          } else {
            parts.pnl.slideDown();
            pageCheckboxActions(parts.pnl);
            parts.li.addClass('selected');
          }
        });

        //Indeterminate State and adding to an array
        $("body").on('click', '.pages-checkbox-span', function (event) {

          var id = $(this).attr("data-subpage");
          var parts = findParts($(event.target), id);
          $(this).children('span').remove();
          switch (state(parts.spn)) {
            case 'on':
              parts.spn.removeClass('selected');
              parts.bxs.removeAttr('checked');
              $(this).find('input').first().prop('checked', false);
              break;
            case 'ind':
              parts.spn.removeClass('indeterminate');
              parts.bxs.removeAttr('checked');
              $(this).find('input').first().prop('checked', true);
              break;
            case 'off':
              parts.li.addClass('selected');
              parts.spn.addClass('selected');
              parts.pnl.slideDown();
              $(this).append('<span></span>');
              $(this).find('input').first().prop('checked', true);
              parts.bxs.click();
              break;
          };
        });

        //$("body").on('click', '.pages-label', function (event) {
        //    console.info(event.target);
        //    var checkboxes = $(event.target).prev().parent().next().find('input');
        //    //console.info(checkboxes.length);
        //    var i = 0;
        //    var j = checkboxes.length;
        //    for (i; i < j; i++) {
        //        var k = s.$bookArray.indexOf(checkboxes[i].id);

        //        if (k === -1) {
        //            s.$bookArray.push(checkboxes[i].id);
        //        } else {
        //            s.$bookArray.splice(k, 1);
        //        }
        //        //console.info(s.$bookArray); // This pushes entire selected section to the Array. Please post this array as data to the printers.

        //    }


        //    if ($(this).parent().next().children().children().find('input').prop('checked') === false) {
        //        $(this).parent().next().children().children().find('input').prop('checked', true);
        //        $(this).parent().addClass('checked-all');
        //        $(this).parent().addClass('selected');
        //        //$(this).parent().removeClass('indeteminate');
        //        if ($('.book-subsection').is(":visible")) {
        //            $('.book-subsection').slideUp();
        //        }

        //        $(this).parent().next().slideDown();


        //        // console.info($(this).parent().next().children().children().find('input').prop('checked'));
        //    } else {
        //        $(this).parent().next().children().children().find('input').prop('checked', false);
        //        $(this).parent().removeClass('checked-all');
        //        $(this).parent().removeClass('selected');
        //        //$(this).parent().removeClass('indeteminate');
        //        $(this).parent().next().slideUp();
        //    }

        //});

      },
      preview: function () {
        var pdfs = [0];
        $.each($('input:checked'), function (i, e) {
          pdfs.push($(e).data('pdfindex'));
        });

        var pages = pdfs.join(',');

        if (pages.length > 0) {
          var win = window.open('viewer/viewer.html?pages=' + pages, '_blank');
          win.focus();
        }
      },

      discard: function () {
        var selectedOptions = $('.book').find('input:checked:not(".locked-checkbox")');
        $.each(selectedOptions, function (i) {
          $(selectedOptions[i]).attr('checked', false);
        });
      }

    };

  bookSectionAccordian.init();
}());