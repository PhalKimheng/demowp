document.addEventListener('DOMContentLoaded', function() {
    var protocolElements = document.querySelectorAll('.js-strip-protocol');
    protocolElements.forEach(function(element) {
        element.textContent = stripProtocol(element.textContent);
    });
});

function stripProtocol(url) {
    return url.replace(/^https?:\/\//, ' ');
}
