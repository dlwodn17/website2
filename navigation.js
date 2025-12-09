/**
 * 네비게이션 바를 생성하고 관리하는 클래스
 */
class NavigationBar {
    constructor(activePage = '') {
        this.menuItems = [
            { name: 'Home', href: 'index.html' },
            { name: 'Musike', href: 'Musike_page.html' },
            { name: 'Techne', href: 'Techne_page.html' },
            { name: 'SNS', href: 'SNS.html' },
            { name: 'Info', href: 'Info.html' }
        ];
        this.activePage = activePage;
        this.activeBackgroundColor = 'rgb(230, 230, 230)';
    }

    /**
     * 네비게이션 바 HTML을 생성합니다.
     * @returns {string} 네비게이션 바 HTML 문자열
     */
    render() {
        let navHTML = '<div class="horizontal-bar"><nav><ul>';
        
        this.menuItems.forEach(item => {
            const isActive = this.isActivePage(item.href);
            const activeStyle = isActive ? `style="background-color: ${this.activeBackgroundColor};"` : '';
            navHTML += `<li ${activeStyle}><a href="${item.href}">${item.name}</a></li>`;
        });
        
        navHTML += '</ul></nav></div>';
        return navHTML;
    }

    /**
     * 현재 페이지가 활성화된 페이지인지 확인합니다.
     * @param {string} href - 확인할 페이지의 href
     * @returns {boolean} 활성화 여부
     */
    isActivePage(href) {
        if (!this.activePage) {
            // activePage가 설정되지 않은 경우, 현재 URL에서 자동 감지
            const currentPage = window.location.pathname.split('/').pop();
            return currentPage === href || (currentPage === '' && href === 'index.html');
        }
        return this.activePage === href || 
               (this.activePage === 'index' && href === 'index.html') ||
               (this.activePage === 'Home' && href === 'index.html');
    }

    /**
     * 네비게이션 바를 지정된 컨테이너에 삽입합니다.
     * @param {string|HTMLElement} container - 네비게이션 바를 삽입할 컨테이너 (선택자 또는 요소)
     * @param {string} position - 삽입 위치 ('beforebegin', 'afterbegin', 'beforeend', 'afterend')
     */
    insertTo(container, position = 'afterbegin') {
        const targetElement = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!targetElement) {
            console.error('NavigationBar: 컨테이너를 찾을 수 없습니다.');
            return;
        }

        targetElement.insertAdjacentHTML(position, this.render());
    }

    /**
     * body 시작 부분에 네비게이션 바를 삽입합니다.
     */
    insertToBody() {
        this.insertTo('body', 'afterbegin');
    }
}

