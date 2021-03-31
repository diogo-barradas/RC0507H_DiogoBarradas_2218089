using Dapper.Contrib.Extensions;

namespace SantaShopAPI.Models
{

    [Table("crianca")]
    public class Crianca {

        public int id { get; set; }
        public string nome { get; set; }
        public int comportamento { get; set; }
        public int presente { get; set; }
        public int idade { get; set; }

    }

}
