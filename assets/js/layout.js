let lastScrollPos = 0;
let panelState = false;
let panelMinHeightCorrection = null;

const handlePanelClasses = () => {
    const panelTopMarginDiv = document.getElementById('panel__top-margin');
    const notesContainerDiv = document.getElementById('notes-container');
    const stickyPanelDiv = document.getElementById('panel__sticky-container');
    const panelCopyrightDiv = document.getElementById('panel__copyright');
    const notesContainerHeight = notesContainerDiv.clientHeight;
    const stickyPanelHeight = stickyPanelDiv.clientHeight;
    const viewPortHeight = window.innerHeight;

    if (viewPortHeight >= stickyPanelHeight) {
        let minHeightCorrection = viewPortHeight - notesContainerHeight + 10;

        if (minHeightCorrection < 30) minHeightCorrection = 30;
        if (minHeightCorrection > 100) minHeightCorrection = 100;
        if (minHeightCorrection !== panelMinHeightCorrection)
            document.getElementById('panel__sticky-container').style.minHeight = `calc(100vh - ${ minHeightCorrection }px)`;

        panelMinHeightCorrection = minHeightCorrection;
        panelCopyrightDiv.style.position = 'sticky';
        panelCopyrightDiv.style.bottom = '35px';
    } else if (panelMinHeightCorrection !== null) {
        stickyPanelDiv.removeAttribute('style');
        panelCopyrightDiv.removeAttribute('style');
        panelMinHeightCorrection = null;
    }

    if (stickyPanelHeight > notesContainerHeight) return;

    const direction = scrollDirection();

    if (direction === 'down') {
        const copyrightOnScreen = document.getElementById('panel__copyright').getBoundingClientRect().top;
        if (panelState !== 'bottom' && copyrightOnScreen + 50 <= viewPortHeight) {
            stickyPanelDiv.className = 'panel-bottom-sticky';
            panelTopMarginDiv.className = 'flex-it'
            panelState = 'bottom';
            return;
        } else if (panelState === 'bottom') return;
    } else if (direction === 'up') {
        const panelOnScreen = stickyPanelDiv.getBoundingClientRect().top;
        if (panelState !== 'up' && panelOnScreen-20 >= 0) {
            stickyPanelDiv.className = 'panel-top-sticky';
            panelTopMarginDiv.removeAttribute('class');
            panelTopMarginDiv.removeAttribute('style');
            panelState = 'up';
            return;
        } else if (panelState === 'up') return;
    }

    if (panelState !== 'margin') {
        const extraOffset = stickyPanelDiv.offsetTop - panelTopMarginDiv.offsetTop;
        if (extraOffset > 0) {
            panelTopMarginDiv.style.height=`${extraOffset}px`;
            panelTopMarginDiv.removeAttribute('class');
            stickyPanelDiv.removeAttribute('class');
            panelState = 'margin';
        }
    }
};

const openMobilePanel = () => {
    document.body.style.overflow = 'hidden';
    document.querySelector('.content__mobile-header').style.visibility = 'hidden';
    document.querySelector('.mobile-panel-fixer-container').style.display = 'flex';
    document.querySelector('#panel__copyright').style = '';
};

const closeMobilePanel = () => {
    document.body.removeAttribute('style');
    document.querySelector('.content__mobile-header').removeAttribute('style');
    document.querySelector('.mobile-panel-fixer-container').removeAttribute('style');
};

const scrollDirection = () => {
    const direction =
        lastScrollPos === undefined || lastScrollPos === 0 || lastScrollPos < window.scrollY
            ? 'down' : 'up';
    lastScrollPos = window.scrollY;
    return direction;
};

handlePanelClasses();
window.addEventListener('scroll', handlePanelClasses);