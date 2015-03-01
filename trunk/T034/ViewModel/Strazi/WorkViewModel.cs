using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace T034.ViewModel.Strazi
{
    public class WorkViewModel
    {
        public string MediumFile { get; set; }

        public List<string> Description { get; set; }

        public string SmallFile { get; set; }
        
        public string OriginalFile { get; set; }
    }
}