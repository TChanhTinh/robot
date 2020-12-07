import React from 'react'
import { Row, Col } from 'antd'

function WordSection({ title, data }) {
    return(
        <div>
            <Row>
              <Col span={24} className="dictionary-content-header">
                {title}
              </Col>
              {Array.isArray(data) ?
                data.map(mapData =>
                <Col span={24}>
                  {mapData}
                </Col>
                ) 
              :
                <Col span={24}>
                  {data}
                </Col>
            }
            </Row>
        </div>
    )
}

export default WordSection