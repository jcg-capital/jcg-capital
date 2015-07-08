
Template.textEditor.rendered = function () {
  var algo = Session.get('clonedAlgo');
  var options = {
      theme:"monokai",
      mode:"javascript",
  };
  
  var ace = AceEditor.instance("archy", options, function(editor){
    console.log(editor);
    editor.insert(algo);
  });

};

Template.textEditor.events({
  

  'click #algo-tab': function(e, instance){
    e.preventDefault();
    console.log(e)
    Template.textEditor.rendered()
  },

  'click #graph-data': function(e, instance){
    e.preventDefault();
    console.log(e);
    var t = AceEditor.instance('#archy')
    var code = t.getSession().getValue().replace(/\'/g, '\"')
    eval(code);
    // eval()
    // $('#chart-container').addSeries(Session.get('currentDataStore'))
  },
  'click #save-algo': function(e, instance){
    e.preventDefault();
    console.log(e)
    var title = prompt('Name of new algo')
    var t = AceEditor.instance('#archy')
    var code = t.getSession().getValue().replace(/\'/g, '\"')
    Algorithms.insert({title: title, body: code })
    alert('Saved code: '+code)
  }
});
 
