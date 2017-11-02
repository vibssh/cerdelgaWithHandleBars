var previewSettings,
  previewModal = {
    settings: {

    },

    init: function (previewBackDrop, previewContent, previewDirection, previewTimeOut) {
      previewSettings = this.settings;
      previewSettings.$previewBackDrop = previewBackDrop;
      previewSettings.$previewContent = previewContent;
      previewSettings.$previewDirection = previewDirection;
      previewSettings.$previewTimeOut = previewTimeOut;


      /*On Load give direction to the Content to come from by adding class */
      previewSettings.$previewContent.addClass(previewSettings.$previewDirection);

      $("body").on('DOMNodeInserted', '.main-book-list', function () {

        var previewLink = document.querySelectorAll('.preview-link');

        for (var l = 0; l < previewLink.length; l++) {
          var links = previewLink[l];
          var level = $('input[type="radio"]:checked').data('level');
          var levelId = parseInt(level);

          if (!links.hasAttribute("data-level")) {
            links.setAttribute('data-level', levelId);
          }
        }
      });

      this.bindUIActions();
    },

    bindUIActions: function () {

      $('.preview-link').on('click', function () {
        previewModal.previewPop();
      });



      /* Rendering PDFs */
      $(document).on('click', '.preview-link', function () {
        previewModal.PDFRender($(this));
      });

      /* Preview Pop Close */
      $(document).on('click', '.preview-modal-close', function () {
        previewModal.previewPopClose();
      });

    },

    previewPop: function () {
      //Activating Modal
      previewSettings.$previewBackDrop.fadeIn().addClass('activate');
      setTimeout(function () {
        previewSettings.$previewContent.removeClass(previewSettings.$previewDirection);
      }, previewSettings.$previewTimeOut);

    },

    previewPopClose: function () {
      previewSettings.$previewContent.addClass(previewSettings.$previewDirection);
      previewSettings.$previewBackDrop.removeClass('activate').fadeOut();
    },



    PDFRender: function ($clicked) {
      // The workerSrc property shall be specified.
      //PDFJS.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
      //PDFJS.workerSrc = '/App/js/third-party/pdf.worker.js';

      var idx = $($clicked)[0].dataset.canvasid;
      //var element;
      if ($('canvas').length) {
        $('canvas').remove();
        $('#preview__text').append("<canvas id ='canvas-" + idx + " '>");
      }

      var pdfDoc = null,
        numPg = $($clicked)[0].dataset.startpage,
        pageNum = parseInt(numPg),
        pageRendering = false,
        pageNumPending = null,
        scale = 1,
        canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d');

      var sectionTitleText = $('.selected').find('.main-title > h4')[0].innerHTML;

      var selectedParent = $('.main-book-list-item.selected').parent('.main-book-list').index();

      var selectedParentIndex = selectedParent + 1; // Adding 1 to the index as js index starts from 0


      $('.preview-modal-title').html('<div class="preview-modal-title-index"> ' + 'Section 0' + selectedParentIndex + '</div>' + sectionTitleText);


      //$('.preview-modal-title').text(sectionTitleText);
      //$('.preview-modal-title-index').text('Section 0' + selectedParentIndex);

      var clickedUrl = $($clicked)[0].dataset.fileurl;

      //var clickedLevel = $($clicked)[0].dataset.level;

      //var clickedPageNumber = $($clicked)[0].dataset.startpage;
      var combinedUrl = clickedUrl + '.pdf';

      var prevBtn = document.getElementById('previous');
      var nextBtn = document.getElementById('next');

      /**
       * Get page info from document, resize canvas accordingly, and render page.
       * @param num Page number.
       */
      function renderPage(num) {
        pageRendering = true;
        // Using promise to fetch the page
        pdfDoc.getPage(num).then(function (page) {
          var viewport = page.getViewport(scale);
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
          var renderTask = page.render(renderContext);

          // Wait for rendering to finish
          renderTask.promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
              // New page rendering is pending
              renderPage(pageNumPending);
              pageNumPending = null;
            }
          });
          var totalPages = (page.transport.numPages * 2) - 2;
          var currentPage = page.pageNumber;

          //if (currentPage === totalPages) {
          //    nextBtn.classList.add("disabled");
          //} else {
          //    nextBtn.classList.remove("disabled");
          //}


          //if (currentPage === 1) {
          //    prevBtn.classList.add("disabled");
          //} else {
          //    prevBtn.classList.remove("disabled");
          //}

          var el = document.getElementById('page-count');
          //var nextPage = currentPage + 1;

          var rangeStart = (currentPage * 2) - 2;

          if ((rangeStart === totalPages && totalPages % 2 === 0)) {
            el.innerHTML = "Page " + rangeStart + " out of    " + totalPages;
            nextBtn.classList.add("disabled");
            prevBtn.classList.remove("disabled");
          } else if (currentPage === 1) {
            el.innerHTML = "Page " + currentPage + " out of    " + totalPages;
            prevBtn.classList.add("disabled");
            nextBtn.classList.remove("disabled");
          } else {
            var rangeEnd = rangeStart + 1;
            el.innerHTML = "Pages " + rangeStart + " - " + rangeEnd + " out of    " + totalPages;
            prevBtn.classList.remove("disabled");
            nextBtn.classList.remove("disabled");
          }
        });

        // Update page counters
        //document.getElementById('page_num').textContent = pageNum;
      }

      /**
       * If another page rendering in progress, waits until the rendering is
       * finised. Otherwise, executes rendering immediately.
       */
      function queueRenderPage(num) {
        if (pageRendering) {
          pageNumPending = num;
        } else {
          renderPage(num);
        }
      }

      /**
       * Displays previous page.
       */
      function onPrevPage() {
        if (pageNum <= 1) {

          return;
        }
        pageNum--;
        queueRenderPage(pageNum);
      }
      prevBtn.addEventListener('click', onPrevPage);

      /**
       * Displays next page.
       */
      function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
          return;
        }
        pageNum++;
        queueRenderPage(pageNum);
      }
      nextBtn.addEventListener('click', onNextPage);

      /*Render Time is faster when set to true*/
      PDFJS.disableWorker = true;
      /**
       * Asynchronously downloads PDF.
       */
      PDFJS.getDocument(combinedUrl).then(function (doc) {
        pdfDoc = doc;
        //document.getElementById('page_count').textContent = pdfDoc.numPages;


        // Initial/first page rendering
        renderPage(pageNum);
      });
    }

  };