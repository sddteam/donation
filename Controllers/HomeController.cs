using donation.Interfaces;
using donation.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace donation.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDonorService _donorService;

        public HomeController(IDonorService donorService)
        {
            _donorService = donorService;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Index2a()
        {
            return View();
        }

        public ActionResult Index2b()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<JsonResult> SubmitDonorForm(Donor donor, bool isAnonymous)
        {
            try
            {
                Donor donorResponse = await _donorService.CreateDonor(donor);
                if (donorResponse == null)
                {
                    return Json(new JsonResponse
                    {
                        IsSuccess = false,
                        Error = "Failed to save donor details."
                    });
                }
                return Json(new JsonResponse
                {
                    IsSuccess = true,
                    ResultJson = JsonConvert.SerializeObject(donor),
                    //Message = "Successfully saved donor details!"
                });
            }
            catch (Exception ex)
            {
                return Json(new JsonResponse
                {
                    IsSuccess = false,
                    Message = $"Oops. Something went wrong. {ex.Message}"
                });
            }
        }
    }
}