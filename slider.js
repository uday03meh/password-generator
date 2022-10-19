var xmlns = "http://www.w3.org/2000/svg",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  container = select('.container'),
  dragger = select('#dragger'),
  dragVal,
  maxDrag = 300


TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set('#upText', {
  alpha: 0,
  transformOrigin: '50% 50%'
})

TweenLite.defaultEase = Elastic.easeOut.config(0.4, 0.1);

var tl = new TimelineMax({
  paused: true
});
tl.addLabel("blobUp")
  .to('#display', 1, {
    attr: {
      cy: '-=40',
      r: 30
    }
  })
  .to('#dragger', 1, {
    attr: {
      //cy:'-=2',
      r: 8
    }
  }, '-=1')
  .set('#dragger', {
    strokeWidth: 4
  }, '-=1')
  .to('.downText', 1, {
    //alpha:0,
    alpha: 0,
    transformOrigin: '50% 50%'
  }, '-=1')
  .to('.upText', 1, {
    //alpha:1,
    alpha: 1,
    transformOrigin: '50% 50%'
  }, '-=1')
  .addPause()
  .addLabel("blobDown")
  .to('#display', 1, {
    attr: {
      cy: 299.5,
      r: 0
    },
    ease: Expo.easeOut
  })
  .to('#dragger', 1, {
    attr: {
      //cy:'-=35',
      r: 15
    }
  }, '-=1')
  .set('#dragger', {
    strokeWidth: 0
  }, '-=1')
  .to('.downText', 1, {
    alpha: 1,
    ease: Power4.easeOut
  }, '-=1')
  .to('.upText', 0.2, {
    alpha: 0,
    ease: Power4.easeOut,
    attr: {
      y: '+=45'
    }
  }, '-=1')

Draggable.create(dragger, {
  type: 'x',
  cursor: 'pointer',
  throwProps: true,
  bounds: {
    minX: 0,
    maxX: maxDrag
  },
  onPress: function() {

    tl.play('blobUp')
  },
  onRelease: function() {
    tl.play('blobDown')
  },
  onDrag: dragUpdate,
  onThrowUpdate: dragUpdate
})

function dragUpdate() {
  dragVal = Math.round((this.target._gsTransform.x / maxDrag) * 100);
  select('.downText').textContent = select('.upText').textContent = dragVal;
  TweenMax.to('#display', 1.3, {
    x: this.target._gsTransform.x

  })

  TweenMax.staggerTo(['.upText', '.downText'], 1, {
    // x:this.target._gsTransform.x,
    cycle: {
      attr: [{
        x: this.target._gsTransform.x + 146
      }]
    },
    ease: Elastic.easeOut.config(1, 0.4)
  }, '0.02')
}

TweenMax.to(dragger, 1, {
  x: 150,
  onUpdate: dragUpdate,
  ease: Power1.easeInOut
})
