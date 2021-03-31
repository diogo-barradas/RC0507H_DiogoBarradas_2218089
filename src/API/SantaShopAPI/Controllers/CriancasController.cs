using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SantaShopAPI.Models;
using MySql.Data.MySqlClient;
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.Data.SqlClient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SantaShopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CriancasController : ControllerBase
    {
        private const string ConnectionString = "Server=localhost;Database=natal;Uid=root;Pwd=";
        
        // GET: api/<PresentsController>
        [HttpGet]
        public IEnumerable<Crianca> Get()
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.GetAll<Crianca>();

            return res;
        }
            
        // GET api/<PresentsController>/5
        [HttpGet("{id}")]
        public Crianca Get(int id)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.Get<Crianca>(id);

            return res;
        }
            
        // POST api/<PresentsController>
        [HttpPost]
        public Crianca Post([FromBody] Crianca cria)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var idNewRec = cn.Insert<Crianca>(cria);

            var res = cn.Get<Crianca>(idNewRec);

            return res;
        }
          
        // PUT api/<PresentsController>/5
        [HttpPut("{id}")]
        public ActionResult<Crianca> Put(int id, [FromBody] Crianca cria)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var recLido = cn.Get<Crianca>(id);

            if (recLido != null)
            { 
                recLido.nome = cria.nome;
                recLido.comportamento = cria.comportamento;
                recLido.presente = cria.presente;
                recLido.idade = cria.idade;

                bool updated = cn.Update<Crianca>(recLido);

                return Ok(recLido);
            }
            else
            {
                return NotFound();

            }
        }
        
        // DELETE api/<PresentsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.Get<Crianca>(id);

            if(res != null)
            {
                bool recsDeleted = cn.Delete<Crianca>(res);
                return Ok();
            }
            else
            {
                return NotFound();

            }
            
            
        }
    }
}
