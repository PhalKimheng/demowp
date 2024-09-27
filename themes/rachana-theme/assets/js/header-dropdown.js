document.addEventListener('DOMContentLoaded', () => {
    function setupDropdown(){
        if (window.innerWidth < 992) {
            const dropdownItems = document.querySelectorAll(
                '#navbarSubDropdown.dropdown-item'
            )
            dropdownItems.forEach((item) => {
                item.addEventListener('click', handleClickEvent)
            })
    
            function handleClickEvent(event) {
                event.preventDefault()
                event.stopPropagation()
    
                const allShownSubmenus = document.querySelectorAll(
                    "ul.sub-menu.dropdown-menu.show"
                  );
                allShownSubmenus.forEach((submenu) =>
                    submenu.classList.remove('show')
                )
    
                const allShownDropdownItems = document.querySelectorAll(
                    '#navbarSubDropdown.dropdown-item.show'
                )
                allShownDropdownItems.forEach((dropdownItem) =>
                    dropdownItem.classList.remove('show')
                )
    
                this.classList.add('show')
                const clickedSubMenu = event.currentTarget.nextElementSibling
                if (clickedSubMenu && clickedSubMenu.matches('ul.sub-menu.dropdown-menu')) {
                    clickedSubMenu.classList.add('show')
                }
            }
        }

    }
    setupDropdown()
    window.addEventListener('resize', setupDropdown)
})
