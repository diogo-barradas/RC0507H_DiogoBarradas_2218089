using Dapper.Contrib.Extensions;

namespace SantaShopAPI.Models
{
    
    [Table("comportamento")]
    public class comportamento {

        public int id { get; set; }
        public string descricao { get; set; }
        public bool merecepresente { get; set; }

    }
}