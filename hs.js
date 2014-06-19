var defaultTemplate = (
        '<h2>{{header}}</h2>\n' +
        '\n' +
        '{{#if persons}}\n' +
        '<ul>\n' +
        '{{#persons}}\n' +
        '    <li>{{name}}: <em>{{role}}</em> <small>(age: {{age}})</small></li>\n' +
        '{{/persons}}\n' +
        '</ul>\n' +
        '{{else}}\n' +
        'Nobody here.\n' +
        '{{/if}}\n' +
        '\n' +
        '<h2>Series</h2>\n' +
        '{{#if series}}\n' +
        '<ul>{{#series}}\n' +
        '    <li>f({{this.[0]}}) = {{this.[1]}}</li>\n' +
        '{{/series}}\n' +
        '</ul>\n' +
        '{{else}}\n' +
        'No values.\n' +
        '{{/if}}'),

    defaultContext = (
        '{\n' +
        '  "header": "People",\n' +
        '  "persons": [\n' +
        '    {"name": "John", "role": "CEO", "age": 47},\n' +
        '    {"name": "Mike", "role": "VP", "age": 53},\n' +
        '    {"name": "Paul", "role": "Sales Manager", "age": 32}\n' +
        '  ],\n' +
        '  "series": function() {\n' +
        '    var a = [], i;\n' +
        '    for (i=0; i<=10; i++) a.push([i, Math.pow(2, i)]);\n' +
        '    return a;\n' +
        '  }\n' +
        '}');

$(document).ready(function() {
    restore();
    render();
    $('#hs-template, #hs-context').bind('input', saveAndRender);
    $('#hs-strip').bind('change', saveAndRender);
    $('#hs-reset').bind('click', reset);
});

function saveAndRender() {
    save();
    render();
}

function render() {
    try {
        var template = Handlebars.compile($('#hs-template').val()),
            context = eval("(" + $('#hs-context').val() + ")"),
            html = template(context);
        if ($("#hs-strip")[0].checked) {
            html = html.replace(/\n\s*\n/g, '\n');
        }
        $('#hs-output').html(hljs.highlightAuto(html).value).css('color', '');
        $('#hs-rendered').html(html).css('display', '');
    } catch (error) {
        $('#hs-output').html(error.toString()).css('color', 'red');
        $('#hs-rendered').html('').css('display', 'none');
    }
}

function save() {
    localStorage.setItem('hs-template', $('#hs-template').val());
    localStorage.setItem('hs-context', $('#hs-context').val());
    localStorage.setItem('hs-strip', $('#hs-strip').attr('checked'));
}

function restore() {
    var template, context;
    $('#hs-template').val((template = localStorage.getItem('hs-template')) != null ? template : defaultTemplate);
    $('#hs-context').val((context = localStorage.getItem('hs-context')) != null ? context : defaultContext);
    $('#hs-strip').attr('checked', localStorage.getItem('hs-strip') == 'true');
}

function reset() {
    localStorage.removeItem('hs-template');
    localStorage.removeItem('hs-context');
    localStorage.removeItem('hs-strip');
    window.location = window.location; // reload
}
