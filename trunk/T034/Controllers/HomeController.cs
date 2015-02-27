using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Db.DataAccess;
using Db.Entity.Vgiik;
using T034.Tools;
using T034.Tools.Auth;
using T034.ViewModel;

namespace T034.Controllers
{
    public class HomeController : Controller
    {
        private readonly IBaseDb _db;

        public HomeController()
        {
            _db = MvcApplication.DbFactory.CreateBaseDb();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Auth()
        {
            var model = YandexAuth.GetUser(Request);

            return PartialView("AuthPartialView", model);
        }

        public ActionResult Works()
        {
            return View();
        }
    }
}
