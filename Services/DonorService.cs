using donation.Interfaces;
using donation.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using JsonFlatFileDataStore;
using System.Threading.Tasks;
using System.Threading;

namespace donation.Services
{
    public class DonorService : IDonorService
    {
        private readonly string jsonDir = HostingEnvironment.MapPath("~/App_Data");
        private readonly string jsonFile = ".json";

        public List<Donor> GetDonors()
        {
            if (!Directory.Exists(jsonDir))
            {
                Directory.CreateDirectory(jsonDir);
            }

            var store = new DataStore(Path.Combine(jsonDir, jsonFile));
            var collection = store.GetCollection<Donor>();
            List<Donor> result = collection.AsQueryable().ToList();
            return result;
        }
        public async Task<Donor> CreateDonor(Donor donor)
        {
            var store = new DataStore(Path.Combine(jsonDir, jsonFile));
            var collection = store.GetCollection<Donor>();

            bool result = await collection.InsertOneAsync(donor);

            return result ? donor : null;
        }
    }
}