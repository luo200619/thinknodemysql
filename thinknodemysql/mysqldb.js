'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mysql = require('mysql2');
var tools = require('usetools');
/**
 * mysql 驱动类
 */

var mysqldb = function () {
	/**
  * 构造函数
  * @作者     como
  * @时间     2018-05-20
  * @版权     思智捷信息管理系统
  * @版本     1.0.0
  * @return {[type]}   [description]
  */
	function mysqldb() {
		var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		(0, _classCallCheck3.default)(this, mysqldb);

		this.config = config;
		this.lasterror = null;
		this.pool = null;
		this.checkConnect();
	}

	/**
  * 检测mysql链接是否正确
  * 线程池无法在开始就检测出正确的链接
  * 所以在这里要先进行检测
  * @作者     como
  * @时间     2018-05-20
  * @版权     思智捷信息管理系统
  * @版本     1.0.0
  * @return {[type]}   [description]
  */


	(0, _createClass3.default)(mysqldb, [{
		key: 'checkConnect',
		value: function checkConnect(callback) {
			try {
				var that = this;
				var conn = mysql.createConnection(that.config);
				conn.end();
				that.pool = mysql.createPool(that.config);
			} catch (err) {
				throw err;
			}
		}
		/**
   * 获取单例对象
   * @作者     como
   * @时间     2018-05-20
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @return {[type]}   [description]
   */

	}, {
		key: 'getPoolHandle',

		/**
   * 调用查询接口
   * @作者     como
   * @时间     2018-05-22
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {String}   sql      [description]
   * @param  {Array}    param    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
		value: function getPoolHandle() {
			var that = this;
			return new _promise2.default(function (resolve, reject) {
				that.pool.getConnection(function (err, conn) {
					if (err) {
						reject(err);
					} else {
						resolve(that.reWriteConn(conn));
					}
				});
				that.findPoolInfo(that.pool);
			});
		}
		/**
   * 重写链接名句柄
   * @作者     como
   * @时间     2018-05-23
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @param  {[type]}   conn [description]
   * @return {[type]}        [description]
   */

	}, {
		key: 'reWriteConn',
		value: function reWriteConn(conn) {
			var that = this;
			var rconn = {};
			rconn.query = function (sql) {
				var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

				return new _promise2.default(function (resolve, reject) {
					conn.query(sql, param, function (err, result, fields) {
						conn.release();
						if (err) {
							reject(err, null, null);
						} else {
							resolve(result, fields);
						}
					});
				});
			};
			rconn.startTrans = function () {
				return new _promise2.default(function (resolve, reject) {
					conn.beginTransaction(function (err) {
						if (err) {
							reject(err);
						} else {
							resolve(true);
						}
					});
				});
			};

			rconn.commit = function () {
				return new _promise2.default(function (resolve, reject) {
					conn.commit(function (err) {
						if (err) {
							reject(err);
						} else {
							resolve(true);
						}
					});
				});
			};

			rconn.rollback = function () {
				return new _promise2.default(function (resolve, reject) {
					conn.rollback();
				});
			};
			return rconn;
		}
		/**
   * 查看线程信息
   * @作者     como
   * @时间     2018-05-24
   * @版权     思智捷信息管理系统
   * @版本     1.0.0
   * @return {[type]}   [description]
   */

	}, {
		key: 'findPoolInfo',
		value: function findPoolInfo(pool) {
			var that = this;
			pool.on('enqueue', function () {
				console.log('Waiting for available connection slot');
			});
		}
	}], [{
		key: 'getInstance',
		value: function getInstance() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var that = this;
			if (!mysqldb.instance) {
				try {
					mysqldb.instance = new mysqldb(config);
				} catch (err) {
					throw err;
				}
			}
			return mysqldb.instance;
		}
	}]);
	return mysqldb;
}();

module.exports = mysqldb;
