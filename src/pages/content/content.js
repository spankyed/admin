import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

import  download  from '../../utility/download'

export default initial => ({
  state: {
    tasks: initial,
    preview: false,
    //html: '',
    showAnnotation: false,
    annotation: {},
    annotations: []
  },
  actions: {
    preview: (evt) => state => ({ preview: true }),
    //setHtml: (html) => state => ({ html: html }),
    setAnnotation: (annotation) => state => ({ annotation: annotation }),
    showAnnotation: (annotation) => state => ({ showAnnotation: true, annotation: annotation}),
    hideAnnotation: () => state => ({ showAnnotation: false}),
    saveAnnotation: (annotation) => state => ({ annotations: [...state.annotations, annotation] }),
    input: e => state => ({ annotation:{...state.annotation, value: e.target.value}})
  },
  view: (state, actions) => ({match}) => {

    console.log('reee')

    const init = (e) => {
      window.easyMDE = new EasyMDE({element: document.getElementById('mde')});
    }
    const destroy = () => {
      easyMDE.toTextArea()
    }

    const port = (e) => {
      let html = document.getElementById('preview').innerHTML
      //download(html.replace(/\n|\r/g, ""), "entry.html", "text/html")
      let data = { 
        //text: html.replace(/\n|\r/g, ""),
        annotations: state.annotations 
      }
      download("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data)),"annotations.json","application/json")
    }

    const compile = (el) => {
      var converter = new showdown.Converter()
      var html = converter.makeHtml(easyMDE.value())
      el.innerHTML = html;
      //actions.setHtml(html)
    }

    const annotate = (el) => {  
      var text, sel, range, frag, rect;
      var id = parseInt(Date.now() * Math.random())
      if (window.getSelection) {
          text = window.getSelection().toString();
          sel = window.getSelection();
          if (sel.rangeCount) {
              range = sel.getRangeAt(0);
              rect = range.getBoundingClientRect()
              range.deleteContents();
              frag = range.createContextualFragment('<span id=text_'+ id +' class="highlight">'+ text +'</span>')
              range.insertNode(frag);
          }
      } /*else if (document.selection && document.selection.createRange) {
          text = document.selection.createRange().text;
          range = document.selection.createRange();
          range.innerHTML = '<span class="highlight">'+text+'</span>';
      }*/
      showAnnotation(id, rect)
    }

    function showAnnotation(id, rect){
      var aPos = rect // document.getElementById('text_'+ id).getBoundingClientRect() // get highlighted text coords
      var annDiv = document.getElementById('annotations')
      var bPos = annDiv.getBoundingClientRect()

      actions.showAnnotation({
        id: id,
        posTop: aPos.top - bPos.top +'px'
      })
      //div.style.left = aPos.left +'px'; // should be right of entire blog section
      //document.getElementById('annotations').addEventListener('click', save)
    }

    let save = (annotation) => (e) => {
      var converter = new showdown.Converter()  
      actions.saveAnnotation({
        id: annotation.id,
        html: converter.makeHtml(annotation.value),
      })
      actions.setAnnotation({
        ...annotation,
        html: converter.makeHtml(annotation.value),
      })
    }


    return (
    <div class="container w-full mx-auto pt-20 justify-center max-w-6xl">
        <a href="#" onclick={port} class="rounded text-white text-sm shadow-border bg-green-700 hover:bg-green-900 p-2 font-sans tracking-wide uppercase font-semibold">Export</a>
        <button onclick={actions.preview} class="rounded text-white text-sm shadow-border bg-yellow-700 hover:bg-yellow-900 p-2 font-sans tracking-wide uppercase font-semibold">Preview</button>
        <button onclick={annotate} class="rounded text-white text-sm shadow-border bg-red-700 hover:bg-red-900 p-2 font-sans tracking-wide uppercase font-semibold">Annotate ({state.annotations.length})</button>

        <div class="w-full mt-10 md:mt-12 text-gray-800 leading-normal">
          { (!state.preview) ? '' :
          
          <div class="flex mb-10 bg-gray-100">
            <div oncreate={compile} id='preview' class="markdown-body w-1/2 p-4">{state.html}</div>

            <div id="annotations" class="relative flex w-1/2">
              { (!state.showAnnotation) ? '' :
                <div id={state.annotation.id} style={`top:${state.annotation.posTop}`} class='annotation absolute flex w-64 shadow-2xl bg-reddish mx-6 p-5 rounded-sm'>
                  { (state.annotation.html) ? state.annotation.html :
                    <div>
                      <textarea id="annotate" class="w-full p-2" oninput={actions.input}></textarea>
                      <button id="save" class="bg-green-300 mx-1 p-1" onclick={save(state.annotation)}>Save</button>
                      {/* <button id="save" class="bg-green-300 mx-1 p-1" onclick={actions.hideAnnotation}>Save</button> */}
                    </div>
                  }
                </div>
              }
            </div>

          </div>

          }
          <div class="bg-gray-100">
            <textarea oncreate={init} onremove={destroy} id="mde"></textarea>
          </div>

        </div>
    </div>  
    )  
  }
});

/* switch might eliminate coniditional
<Switch></Switch>
*/

