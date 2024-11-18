using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace donation.Models
{
    public class JsonResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string ResultJson { get; set; }
        public string Error { get; set; }
        public bool IsSuccess { get; set; }
        public string TimeStamp { get; set; }

        public JsonResponse()
        {
            TimeStamp = DateTime.Now.ToString("yyyyMMddHHmmssffff");
        }
    }
}