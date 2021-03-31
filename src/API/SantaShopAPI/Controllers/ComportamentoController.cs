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
    public class ComportamentoController : ControllerBase
    {
        private const string ConnectionString = "Server=localhost;Database=natal;Uid=root;Pwd=";
        
        // GET: api/<PresentsController>
        [HttpGet]
        public IEnumerable<comportamento> Get()
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.GetAll<comportamento>();

            return res;
        }
       
        // GET api/<PresentsController>/5
        [HttpGet("{id}")]
        public comportamento Get(int id)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.Get<comportamento>(id);

            return res;
        }
               
        // POST api/<PresentsController>
        [HttpPost]
        public comportamento Post([FromBody] comportamento comp)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var idNewRec = cn.Insert<comportamento>(comp);

            var res = cn.Get<comportamento>(idNewRec);

            return res;
        }
             
        // PUT api/<PresentsController>/5
        [HttpPut("{id}")]
        public ActionResult<comportamento> Put(int id, [FromBody] comportamento comp)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var recLido = cn.Get<comportamento>(id);

            if (recLido != null)
            { 
                recLido.descricao = comp.descricao;
                recLido.merecepresente = comp.merecepresente;

                bool updated = cn.Update<comportamento>(recLido);

                return Ok(recLido);
            }
            else
            {
                return NotFound();

            }
        }
       
        // DELETE api/<ComportamentoController>
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);
            
            var res = cn.Get<comportamento>(id);

            if (res != null)
            {
                bool recsDeleted = cn.Delete<comportamento>(res);
                return Ok();
            }
            else
            {
                return NotFound();
            }
            
        }
    }
}
