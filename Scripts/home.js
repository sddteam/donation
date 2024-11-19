const showDonateSwal = async () => {
    const sectionElement = document.getElementById('main-section');
    if (sectionElement) {
        sectionElement.style.display = 'none';
    }

    const donateSwal = await Swal.fire({
        html: `
            <div class="outer__inner__section__swal">
                <div class="hashtag__swal">
                    <span>#HelpUragon</span>
                </div>

                <div class="inner__section__swal">
                    <div class="body__swal">
                        <div class="qr-section">
                            <h4>Scan to donate</h4>
                            <img src="/Content/images/OPT2A/qr-code.png" alt="QR Code">
                            <h4>Thank you</h4>
                            <p>
                                for your generous donation!
                                <br/>You support means so much to us.
                            </p>
                        </div>

                        <div class="instruction-section">
                            <h4>Scan the QR Code</h4>
                            <p>Open your bank or e-wallet app on your phone. <br> Use the app to scan the QR code shown on the screen </p>
                            <p>
                                <span class="note">Note</span>: This QR code is powered by QR PH and can be scanned <br>using any partner
                                <span class="bank">bank or e-wallet app</span>.
                            </p>
                            <p>A small processing fee will apply to your transaction.</p>

                            <button class="custom-swal-button" onclick="Swal.close()">Close</button>

                            <div class="footer__swal">
                                <span>Powered by</span>
                                <div class="logos__swal">
                                    <img src="/Content/images/OPT2A/omnipay-logo.png" alt="OmniPay Logo">
                                    <img src="/Content/images/OPT2A/bastion-logo.png" alt="Bastion Logo">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        // confirmButtonText: "Close",
        showConfirmButton: false,
        customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-button",
        },
        showCloseButton: false,
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