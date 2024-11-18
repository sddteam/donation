const showDonateSwal = async () => {
    const sectionElement = document.getElementById('main-section');
    if (sectionElement) {
        sectionElement.style.display = 'none';
    }

    const donateSwal = await Swal.fire({
        html: `
            <div class="outer__inner__section__swal ">
                <div class="hashtag">
                    <span>#HelpUragon</span>
                </div>

                <div class="inner__section_swal">
                    <div class="qr-section">
                        <h4>Scan to donate</h4>
                        <img src="/Content/images/OPT2A/qr-code.png" alt="QR Code" style="width: 150px; height: 150px; margin: 10px 0;">
                        <p>
                            <strong>Thank you</strong><br/>
                            for your generous donation! You support means so much to us.
                        </p>
                    </div>

                    <div class="instruction-section">
                        <p>Open your bank or e-wallet app on your phone. <br> Use the app to scan the QR code shown on the screen </p>
                        <p style="font-size: 12px;">
                            Note: This QR code is powered by QR PH and can be scanned using any partner 
                            <b>bank or e-wallet app</b>.
                        </p>
                        <p>A small processing fee will apply to your transaction.</p>
                    </div>
                </div>
            </div>
        `,
        // confirmButtonText: "Close",
        showConfirmButton: false,
        customClass: {
            popup: "custom-swal-popup outer__section__swal",
            backdrop: "custom-swal-backdrop",
            confirmButton: "custom-swal-button",
        },
        showCloseButton: false,
        footer: '<span>Powered by <b>OMNIPAY</b> & <b>BASTION</b></span>',
        didClose: () => {
            if (sectionElement) {
                sectionElement.style.display = 'block';
            }
        },
    });

    return donateSwal;
};

document.getElementById('btn-submit').addEventListener('click', function (e) {
    e.preventDefault();
    showDonateSwal();
});
