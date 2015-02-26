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

        public ActionResult Archive()
        {
            var model = _db.Select<Person>();

            return View(model);
        }

        public ActionResult Video()
        {
            return View();
        }

        public ActionResult Photo()
        {
            //http://blueimp.github.io/Bootstrap-Image-Gallery/
            //получить адрес сайта
            //string.Format("{0}://{1}{2}", Request.Url.Scheme, Request.Url.Authority, Url.Content("~"));

            var model = new List<CarouselViewModel>
                {
                    new CarouselViewModel("/Content/images/photo/dpi/", Server.MapPath("/Content/images/photo/dpi/"), "Кафедра ДПИ"),
                    new CarouselViewModel("/Content/images/photo/staropoltavka/", Server.MapPath("/Content/images/photo/staropoltavka/"), "Профориентация в Старополтавке"),
                    new CarouselViewModel("/Content/images/photo/24012015/", Server.MapPath("/Content/images/photo/24012015/"), "")
                };

            return View(model);
        }



        public ActionResult Museum(int room)
        {
            var viewName = "Rooms/Room" + room;
            return View(viewName);
        }

        public ActionResult Presentation()
        {
            return View();
        }
    }
}
