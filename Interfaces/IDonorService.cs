using donation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace donation.Interfaces
{
    public interface IDonorService
    {
        Task<Donor> CreateDonor(Donor donor);
        List<Donor> GetDonors();
    }
}
