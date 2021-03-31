using Dapper.Contrib.Extensions;

namespace SantaShopAPI.Models{

    [Table("presentes")]
    public class presentes {

        public int id { get; set; }
        public string nome { get; set; }
        public int quantidade { get; set; }

    }

}
