function Carousel(elemId) {
  this.carouselElement;

  this.carouselWrapper = document.getElementById(elemId);

  this.nextButton;
  this.prevButton;

  this.bottomButtons;

  this.screenWidth;
  this.screenHeight;

  this.carouselHeight;
  this.carouselWidth;

  this.aspectRatio = 1280 / 720;

  this.totalData;

  this.slideNo = 1;

  this.intervalRef;

  this.decreaseWidthBy = 0;

  this.reCalculateDimensions = function() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    this.carouselWidth = this.screenWidth - this.decreaseWidthBy;
    this.carouselHeight = this.carouselWidth / this.aspectRatio;
    if (this.carouselHeight > this.screenHeight) {
      this.decreaseWidthBy++;
      this.reCalculateDimensions();
    }
  };

  this.initCarousel = function() {
    var ul = document.createElement("ul");
    this.carouselWrapper.appendChild(ul);
    this.carouselElement = ul;
    this.reCalculateDimensions();
    this.updateStyle();
    this.drawNextPrevButtons();
  };

  this.updateStyle = () => {
    this.carouselWrapper.style.overflow = "hidden";
    this.carouselWrapper.style.margin = "0px auto";
    this.carouselWrapper.style.boxShadow = "0px 0px 9px #666";
    this.carouselWrapper.style.position = "relative";
    this.carouselWrapper.style.width = this.carouselWidth + "px";
    this.carouselWrapper.style.height = this.carouselHeight + "px";
    this.carouselElement.style.position = "absolute";
    this.carouselElement.style.left = "0px";
  };

  this.initData = carouselData => {
    this.totalData = carouselData.length;
    this.carouselElement.style.width =
      this.totalData * this.carouselWidth + "px";

    carouselData.forEach(singleData => {
      this.carouselElement.appendChild(
        this.createSingleSlideElement(singleData.image, singleData.link)
      );
    });

    this.drawSlideChangeButtons();
  };

  this.createSingleSlideElement = (image, link) => {
    thisOuterLi = document.createElement("li");
    thisOuterAnchor = document.createElement("a");
    thisImage = document.createElement("img");

    thisOuterLi.style.display = "inline-block";
    thisOuterLi.style.float = "left";
    thisOuterAnchor.style.display = "block";
    thisImage.style.width = this.carouselWidth + "px";
    thisImage.style.height = this.carouselHeight + "px";

    thisOuterAnchor.href = link;
    thisImage.src = image;

    thisOuterAnchor.appendChild(thisImage);
    thisOuterLi.appendChild(thisOuterAnchor);
    return thisOuterLi;
  };

  this.drawNextPrevButtons = () => {
    nextButton = document.createElement("img");
    nextButton.style.position = "absolute";
    nextButton.style.right = "0px";
    nextButton.style.top = "50%";
    nextButton.style.marginTop = "-25px";
    nextButton.style.height = "50px";
    nextButton.style.width = "50px";
    nextButton.style.backgroundColor = "white";
    nextButton.src =
      "https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronRight-512.png";

    prevButton = document.createElement("img");
    prevButton.style.position = "absolute";
    prevButton.style.left = "0px";
    prevButton.style.top = "50%";
    prevButton.style.marginTop = "-25px";
    prevButton.style.height = "50px";
    prevButton.style.width = "50px";
    prevButton.style.backgroundColor = "white";
    prevButton.src =
      "https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronLeft-512.png";

    nextButton.addEventListener("click", () => this.next());
    prevButton.addEventListener("click", () => this.previous());

    this.nextButton = nextButton;
    this.prevButton = prevButton;

    this.carouselWrapper.appendChild(nextButton);
    this.carouselWrapper.appendChild(prevButton);
  };

  this.drawSlideChangeButtons = () => {
    buttons = document.createElement("div");
    buttons.style.position = "absolute";
    buttons.style.height = "25px";
    buttons.style.bottom = "10px";
    buttons.style.width = "100%";
    buttons.style.textAlign = "center";
    ul = document.createElement("ul");

    for (let i = 1; i <= this.totalData; i++) {
      li = document.createElement("li");
      li.style.height = "25px";
      li.style.width = "25px";
      li.style.borderRadius = "100%";
      li.style.backgroundColor = "rgba(255,255,255,.6)";
      li.style.display = "inline-block";
      li.style.margin = "0px 5px";
      var self = this;
      li.addEventListener(
        "click",
        (function(slideNo) {
          return function() {
            self.goToSlide(slideNo);
          };
        })(i)
      );
      ul.appendChild(li);
    }

    buttons.appendChild(ul);
    this.bottomButtons = ul;
    this.carouselWrapper.appendChild(buttons);

    
    this.updateBottomButtons(); 
  };

  this.updateBottomButtons = () =>{
      console.log(this.bottomButtons.childNodes,this.slideNo-1);
      this.bottomButtons.childNodes.forEach((singleButton)=>{
          singleButton.style.backgroundColor = "rgba(255,255,255,.6)";
      })
    this.bottomButtons.childNodes.item(this.slideNo-1).style.backgroundColor = "white";
  }

  this.goToSlide = newSlideNo => {
    //Stop prev interval
    clearInterval(this.intervalRef);



    //start new interval to animate

    var thisLeft = (this.slideNo - 1) * this.carouselWidth;

    if (newSlideNo > this.totalData) {
      this.slideNo = 1;
    } else if (newSlideNo <= 0) {
      this.slideNo = this.totalData;
    } else {
      this.slideNo = newSlideNo;
    }

    //Update The Bottom Navigation Buttons
    this.updateBottomButtons();

    var newLeft = (this.slideNo - 1) * this.carouselWidth;

    var pixelsPerMilli = Math.abs(thisLeft - newLeft) / 100;
    var transitionLeft = thisLeft;
    var self = this;
    var hasStopped = false;
    var ref = setInterval(() => {
      if (thisLeft > newLeft) {
        transitionLeft -= pixelsPerMilli;
        if (newLeft > transitionLeft) {
          clearInterval(ref);
          self.carouselElement.style.left = "-" + newLeft + "px";
          self.restartTimer();
          return;
        }
      } else {
        transitionLeft += pixelsPerMilli;
        if (newLeft < transitionLeft) {
          clearInterval(ref);
          self.carouselElement.style.left = "-" + newLeft + "px";
          self.restartTimer();
          return;
        }
      }
      self.carouselElement.style.left = "-" + transitionLeft + "px";
    }, 1);
  };

  this.next = () => {
    this.goToSlide(this.slideNo + 1);
  };

  this.previous = () => {
    this.goToSlide(this.slideNo - 1);
  };

  this.intervalRef = setInterval(() => this.mainLoop(), 1000);

  this.mainLoop = () => {
    this.next();
  };

  this.restartTimer = () => {
    clearInterval(this.intervalRef);
    this.intervalRef = setInterval(() => this.mainLoop(), 1000);
  };
}
