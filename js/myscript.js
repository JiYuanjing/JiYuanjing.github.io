

function loadHTML(url, elementId) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok: ' + response.statusText);
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading the HTML:', error);
        });
}

// 为了便于理解，这里假设你有一个元素的ID为'content'
// 你可以像这样调用loadHTML函数来加载一个HTML片段到该元素中
// loadHTML('path/to/your/html/file.html', 'content');

