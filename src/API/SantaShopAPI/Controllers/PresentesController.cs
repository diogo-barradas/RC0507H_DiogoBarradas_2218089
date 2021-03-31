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
    public class PresentesController : ControllerBase
    {
        private const string ConnectionString = "Server=localhost;Database=natal;Uid=root;Pwd=";
        
        // GET: api/<PresentsController>
        [HttpGet]
        public IEnumerable<presentes> Get()
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.GetAll<presentes>();

            return res;
        }
             
        // GET api/<PresentsController>/5
        [HttpGet("{id}")]
        public presentes Get(int id)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var res = cn.Get<presentes>(id);

            return res;
        }
          
        // POST api/<PresentsController>
        [HttpPost]
        public presentes Post([FromBody] presentes present)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var idNewRec = cn.Insert<presentes>(present);

            var res = cn.Get<presentes>(idNewRec);

            return res;
        }
            
        // PUT api/<PresentsController>/5
        [HttpPut("{id}")]
        public ActionResult<presentes> Put(int id, [FromBody] presentes presentes)
        {
            MySqlConnection cn = new MySqlConnection(ConnectionString);

            var recLido = cn.Get<presentes>(id);

            if (recLido != null)
            { 
                recLido.nome = presentes.nome;
                recLido.quantidade = presentes.quantidade;

                bool updated = cn.Update<presentes>(recLido);

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

            var res = cn.Get<presentes>(id);

            if(res != null)
            {
                bool recsDeleted = cn.Delete<presentes>(res);
                return Ok();
            }
            else
            {
                return NotFound();

            }
            
            
        }
    }
}
