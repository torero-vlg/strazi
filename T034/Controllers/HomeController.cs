using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Mvc;
using Db.DataAccess;
using Db.Entity.Vgiik;
using T034.Tools;
using T034.Tools.Auth;
using T034.ViewModel;
using T034.ViewModel.Strazi;

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

        public ActionResult Butterfly()
        {
            return View();
        }

        public ActionResult Work(string file)
        {
            var model = new WorkViewModel
                {
                    OriginalFile = file.Replace("-150.jpg", "-original.jpg").Replace("-tn.jpg", ".jpg"),
                    MediumFile = file.Replace("-150.jpg", "-600.jpg").Replace("-tn.jpg", ".jpg"),
                    SmallFile = file,
                    Description = getDescription(file)
                };
            return PartialView("Strazi/Work", model);
        }

        private List<string> getDescription(string file)
        {
            var result = new List<string>();
            switch (file)
            {
                case "anastasia-150.jpg":
                    result.Add("Наименование: Анастасия (именная)  (20см*30см))");
                    result.Add("Количество камней: 124 шт");
                    result.Add("Размерность камней: S10");
                    result.Add("Стоимость: 1 500 руб");
                    break;
                case "butterfly-150.jpg":
                    result.Add("Наименование: Бабочка.  (20см*20см)");
                    result.Add("Количество камней: 206 шт");
                    result.Add("Размерность камней: S12, S20");
                    result.Add("Стоимость: 2 000 руб");
                    break;
                case "nude-150.jpg":
                    result.Add("Наименование: Ню.  (20см*30см)");
                    result.Add("Количество камней: 250 шт");
                    result.Add("Размерность камней: S12, S14, S16, S20");
                    result.Add("Стоимость: 2 150 руб");
                    break;
                case "rosefrmcat-150.jpg":
                    result.Add("Наименование: Розы от кисы. (20см*30см)");
                    result.Add("Количество камней: 150 шт");
                    result.Add("Размерность камней: S10. S14. S16");
                    result.Add("Стоимость: 1 300 руб");
                break;

                case "butterflies-150.jpg":
                    result.Add("Наименование: Бабочки.  (20см*25см)");
                    result.Add("Количество камней: 200 шт");
                    result.Add("Размерность камней: S10, S12, S16");
                    result.Add("Стоимость: 1 950 руб");
                break;

                case "tiger-150.jpg":
                    result.Add("Наименование: Тигр.  (30см*30см)");
                    result.Add("Количество камней: 281 шт");
                    result.Add("Размерность камней: S10, S12, S14");
                    result.Add("Стоимость: 2 300 руб");
                break;

                case "cat-150.jpg":
                    result.Add("Наименование: Киса.  (30см*40см)");
                    result.Add("Количество камней: 434 шт");
                    result.Add("Размерность камней: S8, S10, S12, S16");
                    result.Add("Стоимость: 3 850руб");
                break;

                case "chmml-150.jpg":
                    result.Add("Наименование: Ромашки.  (30см*40см)");
                    result.Add("Количество камней: 460  шт");
                    result.Add("Размерность камней: S16");
                    result.Add("Стоимость: 3 950руб");
                break;

                case "oneumbrl-150.jpg":
                    result.Add("Наименование: Под одним зонтом.  (20см*30см)");
                    result.Add("Количество камней: 200 шт");
                    result.Add("Размерность камней: S10, S16");
                    result.Add("Стоимость: 1 950руб");
                break;

                case "guitar-150.jpg":
                    result.Add("Наименование: Гитара.  (20см*30см)");
                    result.Add("Количество камней: 210 шт");
                    result.Add("Размерность камней: S10, S12,  S14");
                    result.Add("Стоимость: 1 100руб");
                    result.Add("PS: полная стоимость картины будет перечислена в фонд \"\"");
                break;

                case "ladybug-150.jpg":
                    result.Add("Наименование: Божья коровка.  (20см*30см)");
                    result.Add("Количество камней: 174 шт");
                    result.Add("Размерность камней: S10, S12,  S16");
                    result.Add("Стоимость: 1 800руб");
                break;

                case "venicegrdn-150.jpg":
                    result.Add("Наименование: Сады Венеции.  (30см*40см)");
                    result.Add("Количество камней: 364 шт");
                    result.Add("Размерность камней: S10, S12,  S14");
                    result.Add("Стоимость: 3 400руб");
                break;

                case "venicesky-150.jpg":
                    result.Add("Наименование: Небо Венеции.  (30см*40см)");
                    result.Add("Количество камней: 400 шт");
                    result.Add("Размерность камней:  S12,  S16");
                    result.Add("Стоимость: 3 600руб");
                break;

                case "smilecat-150.jpg":
                    result.Add("Наименование: Кошка с улыбкой.  (30см*40см)");
                    result.Add("Количество камней: 397 шт");
                    result.Add("Размерность камней:  S10,  S14, S16,  S20");
                    result.Add("Стоимость: 3 500руб");
                break;

                case "orchid-150.jpg":
                    result.Add("Наименование: Орхидеи.  (20см*20см)");
                    result.Add("Количество камней: 200 шт");
                    result.Add("Размерность камней:  S12");
                    result.Add("Стоимость: 1 850руб");
                break;

                case "rings-150.jpg":
                    result.Add("Наименование: Кольца.  (20см*30см)");
                    result.Add("Количество камней: 226 шт");
                    result.Add("Размерность камней:  S12,  S14, S16");
                    result.Add("Стоимость: 1 900руб");
                break;
            }

            return result;
        }
    }
}
