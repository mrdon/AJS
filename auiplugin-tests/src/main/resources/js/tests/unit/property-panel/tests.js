(function($) {
    //some helper methods that i might move into another file at some point.
    //might actually move them into an AJS.Assert?
    var Assert = {
          IsFalse: function(bool, message) {
              ok(!bool, message);
          },
          IsTrue: function(bool, message) {
              ok(bool, message);
          },

          AreEqual: function(expected, actual, message) {
              equals(actual, expected, message);
          },

          AreNotEqual: function(expected, actual, message) {
              ok(actual != expected, message);
          },

          AreSame: function(expected, actual, message) {
                  same(actual, expected, message);
          }
    };
    //TODO: there is one untested path and that is to do with the snapToElement function, so we need a test testing the options object has some effect
    var AssertDestroyed = function()    {
         Assert.IsTrue(AJS.PropertyPanel.current === null,"Current property panel is null");
         Assert.IsFalse($(".aui-property-panel").length == 1,"Property panel div has been removed");
         Assert.IsFalse($(".aui-shadow-parent").length == 1,"Property panel shadow has been removed");
    };

    var createSimpleButtonSet = function() {
       return  [
        		 {
                        className: "className",
                        text: "Text",
                        tooltip: "tooltip",
                        click: function (a) {
                            AJS.$(a).text("clicked");
                        },
                        selected: ""
                    }
        		];
    };
    var propertyPanelCreation = function(buttonSet) {
            return AJS.PropertyPanel.createFromButtonModel(AJS.$(".test-container"), buttonSet, null);
    };
    
    
    //start tests
    module("property button panel creation", {
        setup: function() {
             this.buttonSet = createSimpleButtonSet();
             this.panel = propertyPanelCreation(this.buttonSet);
        },
        teardown: function(){
            AJS.PropertyPanel.destroy();
            $(".test-container").text('');
        }
    });


    test("Property panel created", function() {
        Assert.AreSame(this.panel,AJS.PropertyPanel.current,"Property panel returned is the current showing panel");
        Assert.IsTrue(AJS.$(".aui-property-panel-parent").length == 1, "Creation should only create one property panel");
        Assert.IsTrue(AJS.$(".aui-property-panel").length == 1 && $(".aui-shadow-parent").length ==1, "Creation should create a panel and a shadow");
        Assert.IsTrue($(".aui-tip-parent").length == 1,"Creation should create a panel and a tip");
    });

    test("Button property panel creation", function() {
        var $buttons = $("a",".aui-property-panel"),
        toolTip = this.buttonSet[0].tooltip,
        text = this.buttonSet[0].text,
        className = this.buttonSet[0].className,
        clickEventMatch = "clicked";
    
        Assert.IsTrue($buttons.length == this.buttonSet.length,"Number of buttons created matches specified array");
        Assert.IsTrue($buttons.length == this.buttonSet.length,"Number of buttons created matches specified array");
        Assert.AreEqual(toolTip,$buttons.attr("Title"),"Title applied should match specified tooltip");
        Assert.AreEqual(text,$buttons.text(),"Text created should match created A tag text");
        //the button creation creates first and last for the first and last buttons
        //as this is the only button it will also have first and last
        Assert.AreEqual(className+" last first",$buttons.attr("class"),"Class applied should match specified Class including the first and class");
        $buttons.trigger('click');
        Assert.AreEqual(clickEventMatch ,$(".test-container").text(),"Click event calls the specified callback");
    });
    
    
    module("Property panel content creation");
    
        test("Property panel created with content", function() {
        
            var panel = AJS.PropertyPanel.create(AJS.$(".test-container"),"<div id=\"someContent\">hello world</div>",null);    
            Assert.AreSame(panel,AJS.PropertyPanel.current,"Property panel returned is the current showing panel");
            Assert.IsTrue(AJS.$(".aui-property-panel-parent").length == 1, "Creation should only create one property panel");
            Assert.IsTrue(AJS.$(".aui-property-panel").length == 1 && $(".aui-shadow-parent").length ==1, "Creation should create a panel and a shadow");
            Assert.IsTrue($(".aui-tip-parent").length == 1,"Creation should create a panel and a tip");
            Assert.IsTrue(AJS.$(".aui-property-panel").find("#someContent").length == 1,"creation should insert a div with matching id");
            Assert.IsTrue(AJS.$(".aui-property-panel").find("#someContent").text() == "hello world","creation should insert a div with matching id");
        });
    

    module("property panel destruction", {
        setup: function() {
            this.buttonSet = createSimpleButtonSet();
            this.panel = propertyPanelCreation(this.buttonSet);
        }
    });
    
    test("Explicitly calling destroy closes panel", function() {
           AJS.PropertyPanel.destroy();
           AssertDestroyed();
    });

    test("Clicking document closes panel", function() {
         $(document).trigger('click');
         AssertDestroyed();
    });

    test("Clicking inside panel does not close panel", function() {
         $(".aui-property-panel").trigger('click');
         Assert.AreSame(this.panel,AJS.PropertyPanel.current,"A property panel instance still exists after clicking .aui-property-panel");
         $("a",".aui-property-panel").trigger('click');
         Assert.AreSame(this.panel,AJS.PropertyPanel.current,"A property panel instance still exists after clicking a button in the property pane");
         AJS.PropertyPanel.destroy();
    });
    
    test("Hitting anything but escape does not closes panel", function() {
           var e = AJS.$.Event("keydown");
           e.keyCode = 48;
           $(document).trigger(e);
           Assert.AreSame(this.panel,AJS.PropertyPanel.current,"A property panel instance still exists after hitting a key other than escape");
           AJS.PropertyPanel.destroy();
       });

    test("Hitting escape closes panel", function() {

        var e = AJS.$.Event("keydown");
        e.keyCode = 27;
        $(document).trigger(e);
        AssertDestroyed();
    });

    test("Destroying the panel removes the tip", function() {
         AJS.PropertyPanel.destroy();
         Assert.IsFalse($(".aui-tip-parent").length == 1,"Property panel tip has been removed");
    });    
    

    module("Property panel events", {
        setup: function() {
                 this.buttonSet = createSimpleButtonSet();

        },
        teardown: function(){
            AJS.PropertyPanel.destroy();
        }
    });
        
    test("Creating a panel fires a created event", 1 ,function() {
          stop(1000);
          var fired = false;
          AJS.bind("created.property-panel",function() {
            fired = true;
            start();
          });
          propertyPanelCreation(this.buttonSet);
          Assert.IsTrue(fired,"Property panel fired event when created");
          AJS.PropertyPanel.destroy();
    });
        
    test("Destroying a panel fires a destroy event", 1 ,function() {
          stop(1000);
          var fired = false,
          panel =  propertyPanelCreation(this.buttonSet);
          AJS.bind("destroyed.property-panel",function() {
                fired = true;
                start();
          });
          AJS.PropertyPanel.destroy();
          Assert.IsTrue(fired,"Property panel fired event when created");
          AJS.PropertyPanel.destroy();
    });    
})(AJS.$);
