// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";



/* Custom Select Implementation */
document.addEventListener("DOMContentLoaded", function () {
    const customSelects = document.querySelectorAll(".calculator__select");

    customSelects.forEach((select) => {
        const wrapper = select.closest('.calculator__select-wrapper');
        // Hide original select
        select.style.display = "none";

        // Create the selected item div
        const selectedDiv = document.createElement("div");
        selectedDiv.setAttribute("class", "select-selected");
        // Set initial text from the first option (or placeholder)
        selectedDiv.innerHTML = select.options[select.selectedIndex].innerHTML;
        wrapper.appendChild(selectedDiv);

        // Create the options container
        const itemsDiv = document.createElement("div");
        itemsDiv.setAttribute("class", "select-items select-hide");

        for (let i = 1; i < select.length; i++) { // Start from 1 to skip placeholder if needed, or 0. Logic: usually first is placeholder "Тип ремонта"
            /* For each option in the original select, create a new DIV that will act as an option item: */
            const optionDiv = document.createElement("div");
            optionDiv.innerHTML = select.options[i].innerHTML;
            
            optionDiv.addEventListener("click", function (e) {
                /* When an item is clicked, update the original select box,
                and the selected item: */
                const s = this.parentNode.parentNode.querySelector("select");
                const h = this.parentNode.previousSibling;
                
                for (let i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        // Trigger change event on original select if needed
                        s.dispatchEvent(new Event('change'));
                        
                        const y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (let k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            itemsDiv.appendChild(optionDiv);
        }
        wrapper.appendChild(itemsDiv);

        // Toggle dropdown on click
        selectedDiv.addEventListener("click", function (e) {
            /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
            e.stopPropagation();
            closeAllSelects(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
            // Rotate the SVG arrow if it exists as sibling
            const svgArrow = wrapper.querySelector('.calculator__select-arrow');
            if(svgArrow) svgArrow.classList.toggle('active');
        });
    });

    function closeAllSelects(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        const x = document.getElementsByClassName("select-items");
        const y = document.getElementsByClassName("select-selected");
        const arrows = document.querySelectorAll('.calculator__select-arrow');
        
        const xl = x.length;
        const yl = y.length;
        const arr = [];
        
        for (let i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arr.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
                // Remove active class from corresponding arrow
                 const wrapper = y[i].closest('.calculator__select-wrapper');
                 if(wrapper) {
                     const arrow = wrapper.querySelector('.calculator__select-arrow');
                     if(arrow) arrow.classList.remove('active');
                 }
            }
        }
        for (let i = 0; i < xl; i++) {
            if (arr.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelects);
});


