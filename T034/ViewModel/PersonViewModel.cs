using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace T034.ViewModel
{
    public class PersonViewModel
    {
        public string FullName { get; set; }
        public int PersonId { get; set; }
        public List<CarouselViewModel> Docs { get; set; }

        public IEnumerable<string> Files { get; set; }
    

        public string FilesFolder
        {
            get { return string.Format("/Content/images/people/{0}/files/", PersonId); }
        }
    }
}