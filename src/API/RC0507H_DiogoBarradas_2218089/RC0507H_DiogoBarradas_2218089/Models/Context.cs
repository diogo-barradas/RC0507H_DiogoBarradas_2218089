using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace RC0507H_DiogoBarradas_2218089.Models
{
    public class Context : DbContext
    {
        public Context() : base("DefaultConnection")
        {
        }
        public DbSet<Customers> Customers { get; set; }
    }
}