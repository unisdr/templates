// Modal dialog opening/closing
const dialog = document.querySelector("#modalForm00");
const dialogCloseButton = document.querySelector("#modalFormClose");

if (dialog) {
    dialog.showModal();
}

if (dialogCloseButton) {
    dialogCloseButton.addEventListener("click", () => {
        dialog.close();
    });
}

// openSnackbar();
