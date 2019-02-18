using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Calendar.Controllers
{
    public class CalendarController : Controller
    {
		const string WeatherURL = "http://api.openweathermap.org/data/2.5/find?q=Barcelona,es&units=metric&APPID=2ab726462ddb4d87ddc622a5192deced";

		// GET: Calendar
		public ActionResult Index()
        {
            return View();
        }

		public string GetWeather()
		{
            try
            {
                using (var client = new HttpClient())
                {
                    var response = client.GetAsync(WeatherURL).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var content = response.Content;

                        string responseString = content.ReadAsStringAsync().Result;

                        return responseString;
                    }

                    return "KO";
                }
            }
            catch(Exception ex){
                throw ex;
            }
		}
    }
}