export class CytoscapeStyleSheet {
  static style: any = [
    {
      selector: 'node',
      style: {

        content: 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 1,
        'text-outline-color': 'data(colorCode)',                
        'height': 100,
        'width': 100,
        'font-size': 10      
      }
    },
    // {
    //   selector: ':selected',
    //   style: {
    //     'border-width': 1,
    //     'border-color': 'black'
    //   }
    // },
    // {
    //   selector: ':edge',
    //   style: {
    //     'curve-style': 'bezier',
    //     opacity: 1,
    //     'target-arrow-shape': 'triangle',
    //     'line-color': '#041E42',
    //     'source-arrow-color': '#041E42',
    //     'target-arrow-color': '#041E42'
    //   }
    // },
    // {
    //   selector: '.edge.questionable',
    //   style: {
    //     'line-style': 'dotted',
    //     'target-arrow-shape': 'diamond'
    //   }
    // },
    // {
    //   selector: '.faded',
    //   style: {
    //     opacity: 0.25,
    //     'text-opacity': 0
    //   }
    // },
    // {
    //   selector: '.edgehandles-source',
    //   style: {
    //     'border-width': 2,
    //     'border-color': 'red'
    //   }
    // },
    // {
    //   selector: '.edgehandles-taget',
    //   style: {
    //     'border-width': 2,
    //     'border-color': 'red'
    //   }
    // },
    // {
    //   selector: '.edgehandles-preview, .edgehandles-ghost-edge',
    //   style: {
    //     'line-color': 'red',
    //     'target-arrow-color': 'red',
    //     'source-arrow-color': 'red'
    //   }
    // },
    // {
    //   selector: '.eh-handle',
    //   style: {
    //     'background-color': '#8bd4c1',
    //     width: 14,
    //     height: 14,
    //     shape: 'ellipse',
    //     'overlay-opacity': 0,
    //     'border-width': 14, // makes the handle easier to hit
    //     'border-opacity': 0
    //   }
    // },
    // {
    //   selector: '.eh-hover',
    //   style: {
    //     'background-color': '#8bd4c1'
    //   }
    // },

    // {
    //   selector: '.eh-source',
    //   style: {
    //     'border-width': 2,
    //     'border-color': '#8bd4c1'
    //   }
    // },

    // {
    //   selector: '.eh-target',
    //   style: {
    //     'border-width': 2,
    //     'border-color': '#8bd4c1'
    //   }
    // },

    // {
    //   selector: '.eh-preview, .eh-ghost-edge',
    //   style: {
    //     'background-color': '#8bd4c1',
    //     'line-color': '#8bd4c1',
    //     'target-arrow-color': '#8bd4c1',
    //     'source-arrow-color': '#8bd4c1'
    //   }
    // },
    // {
    //   selector: '.eh-ghost-edge.eh-preview-active',
    //   style: {
    //     opacity: 0
    //   }
    // }
  ];
}
