import { useState } from 'react';
import CollectionFormCategory from './ColectionFormCategory';
import ColectionFormProduct from './ColectionFormProduct';
import { Button } from 'antd';
import CollectionFormComment from './ColectionFormComment';

const ModalCreate = ({ type, getCategories, getProducts, getTotalPageProduct, getTotalPageCategories, pid }) => {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Thêm {type}
            </Button>
            {
                type === 'sản phẩm' && <ColectionFormProduct
                    open={open}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    getProducts={getProducts}
                    getTotalPageProduct={getTotalPageProduct}
                />
            }
            {
                type === 'loại sản phẩm' && <CollectionFormCategory
                    open={open}
                    onCancel={() => {
                        setOpen(false);
                    }}
                    getCategories={getCategories}
                    getTotalPageCategories={getTotalPageCategories}
                />
            }
            {
                type === 'đánh giá' && <CollectionFormComment
                    pid={pid}
                    open={open}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            }
        </div>
    );
}

export default ModalCreate;