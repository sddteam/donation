const showDonateSwal = async () => {
  const sectionElement = document.getElementById("main-section");
  if (sectionElement) {
    sectionElement.style.display = "none";
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

                            <button class="custom-swal-button">Close</button>

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
        sectionElement.style.display = "block";
      }
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
  });

  return donateSwal;
};

$(document).ready(function () {
  // Function to toggle form field disable state when "Stay anonymous" is checked
  function toggleAnonymousFields() {
    const isAnonymous = $("#stayAnonymous").is(":checked");

    if (isAnonymous) {
      $("#Name, #Email, #ContactNumber").prop("disabled", true); // Disable the fields
      $("#Name, #Email, #ContactNumber").addClass("grayed-out"); // Apply grayed-out style
    } else {
      $("#Name, #Email, #ContactNumber").prop("disabled", false); // Enable the fields
      $("#Name, #Email, #ContactNumber").removeClass("grayed-out"); // Remove grayed-out style
    }
  }

  $(document).on("click", ".custom-swal-button", function(e){
    e.preventDefault();

    Swal.close();
    window.location.reload();
  });

  // Handle changes to the "Stay anonymous" checkbox
  $("#stayAnonymous").on("change", function () {
    toggleAnonymousFields(); // Toggle form fields state
  });

  // Initial toggle on page load
  toggleAnonymousFields();

  // Handle "Donate Now" button click
  $(".btn-donate").on("click", function () {
    // Gather form data
    const donorData = {
      Name: $("#Name").val() || null,
      Email: $("#Email").val() || null,
      ContactNumber: $("#ContactNumber").val() || null,
    };

    // Get the Anti-forgery token value
    const requestVerificationToken = $(
      'input[name="__RequestVerificationToken"]'
    ).val();

    const donorForm = $("form#donorForm");

    const isAnonymous = $("#stayAnonymous").is(":checked");
    //console.log(isAnonymous)

    $.ajax({
      url: "/Home/SubmitDonorForm", // Correctly map to HomeController
      method: "POST",
      dataType: "json",
      data: {
        donor: donorData,
        isAnonymous: isAnonymous,
        __RequestVerificationToken: requestVerificationToken, // Include token in data
      },
      success: function (response) {
        // Log the full response for debugging
        console.log("Server Response:", response);

        if (response.IsSuccess) {
          // Display success message
          console.log("Donor Data Saved:", response.ResultJson);
          $("form")[0].reset(); // Clear the form
        } else {
          alert("Error: " + (response.Error || response.Message));
          console.log("Error Details:", response);
        }
      },
      error: function (xhr, status, error) {
        // Log the error details for debugging
        console.error("AJAX Error:", {
          xhr: xhr,
          status: status,
          error: error,
        });

        // Display a generic error message
        alert("An unexpected error occurred. Please try again later.");
      },
    });

    showDonateSwal();

    // Log gathered data and the request token for debugging
    //console.log("Gathered Data:", donorData);
    //console.log("Is Anonymous:", isAnonymous);
    //console.log("Request Verification Token:", requestVerificationToken);

    // Send AJAX POST request
  });

  $(document).on("input", "#Name", function () {
    console.log("test")
    this.value = this.value.replace(/[^a-zA-Z]/g, "");
  });

  // $(document).on("input", "#ContactNumber", function () {
  //   this.value = this.value.replace(/[^0-9]/g, "");
  // });

  $(document).on("input", "form input", function(e) {
    e.preventDefault();

    const submitBtnEl = $("#btn-submit");
    const isAnonymous = $("#stayAnonymous").is(":checked");

    if (!isAnonymous) {
      console.log("test 125");

      //$(donorForm).validate().form();
      $("form#donorForm").validate({
        rules: {
          Name: {
            minlength: 3,
            required: true,
          },
          Email: {
            required: false, // Optional field
            email: true,
          },
          ContactNumber: {
            required: false,
            minlength: 16,
            maxlength: 16,
          },
        },
        messages: {
          Name: {
            minlength: "Please enter at least 3 characters.",
          },
          Email: {
            email: "Please enter a valid email address.",
          },
          ContactNumber: {
            required: "Please enter a contact number.",
            minlength: "Please enter a valid 11-digit contact number.",
            maxlength: "Please enter a valid 11-digit contact number.",
          },
        },
      });

      if (!$("form#donorForm").valid()) {
        $(submitBtnEl).attr("disabled", true);
        return;
      }
      
      $(submitBtnEl).removeAttr("disabled")
    } else {
      $(submitBtnEl).removeAttr("disabled")
    }
  });

  $(document).on("change", "#stayAnonymous", function() {
    const submitBtnEl = $("#btn-submit");

    const checkbox = $(this)
    if (checkbox.is(":checked")){
      $("form")[0].reset();
      $("form").validate().resetForm()
      $(checkbox).prop("checked", true);
      $(submitBtnEl).removeAttr("disabled")
    }
    else {
      $(submitBtnEl).attr("disabled", true)
    }
  });

  $("#ContactNumber").inputmask("+63 999 999 9999");
  $("#ContactNumber").val("+63");
});
